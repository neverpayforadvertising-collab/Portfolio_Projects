using System.Security.Claims;

namespace Platform.Core.Identity;

public static class ClaimsPrincipalExtensions
{
    public static string? GetTenantId(this ClaimsPrincipal user)
    {
        return user.FindFirst("tenant_id")?.Value
            ?? user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }

    public static IEnumerable<string> GetRoles(this ClaimsPrincipal user)
    {
        return user.FindAll(ClaimTypes.Role).Select(c => c.Value);
    }

    public static bool HasPermission(this ClaimsPrincipal user, string permission)
    {
        return user.FindAll("permission").Any(c => string.Equals(c.Value, permission, StringComparison.OrdinalIgnoreCase));
    }
}
