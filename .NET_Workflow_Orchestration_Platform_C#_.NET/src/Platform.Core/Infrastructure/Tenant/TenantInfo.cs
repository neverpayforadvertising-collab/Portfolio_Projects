namespace Platform.Core.Infrastructure.Tenant;

public sealed class TenantInfo
{
    public string TenantId { get; init; } = string.Empty;
    public string DisplayName { get; init; } = string.Empty;
    public TenantMode Mode { get; init; } = TenantMode.Shared;

    public bool IsIsolatedDatabase => Mode == TenantMode.IsolatedDatabase;
}

public enum TenantMode
{
    Shared,
    IsolatedDatabase
}
