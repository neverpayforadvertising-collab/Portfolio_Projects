using System.Security.Claims;
using Platform.Core.Infrastructure.Tenant;

namespace Platform.Core.Infrastructure.Tenant;

public sealed class TenantResolverMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<TenantResolverMiddleware> _logger;
    private readonly ITenantProvider _tenantProvider;

    public TenantResolverMiddleware(RequestDelegate next, ILogger<TenantResolverMiddleware> logger, ITenantProvider tenantProvider)
    {
        _next = next;
        _logger = logger;
        _tenantProvider = tenantProvider;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var tenantId = ResolveTenantId(context);
        if (string.IsNullOrWhiteSpace(tenantId))
        {
            _logger.LogWarning("Tenant resolution failed for request {Path}", context.Request.Path);
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(new { error = "Tenant id is required." });
            return;
        }

        _tenantProvider.SetTenant(new TenantInfo
        {
            TenantId = tenantId,
            DisplayName = tenantId,
            Mode = DetermineTenantMode(tenantId)
        });

        context.Items[typeof(TenantInfo)] = _tenantProvider.CurrentTenant;
        await _next(context);
    }

    private static string? ResolveTenantId(HttpContext context)
    {
        if (context.Request.Headers.TryGetValue("X-Tenant-Id", out var headerValues))
        {
            return headerValues.FirstOrDefault();
        }

        var claimTenant = context.User?.FindFirst("tenant_id")?.Value;
        if (!string.IsNullOrWhiteSpace(claimTenant))
        {
            return claimTenant;
        }

        if (context.Request.Host.Host.Contains("."))
        {
            var hostParts = context.Request.Host.Host.Split('.');
            if (hostParts.Length >= 3)
            {
                return hostParts[0];
            }
        }

        return null;
    }

    private static TenantMode DetermineTenantMode(string tenantId)
    {
        return tenantId.StartsWith("ent-", StringComparison.OrdinalIgnoreCase)
            ? TenantMode.IsolatedDatabase
            : TenantMode.Shared;
    }
}
