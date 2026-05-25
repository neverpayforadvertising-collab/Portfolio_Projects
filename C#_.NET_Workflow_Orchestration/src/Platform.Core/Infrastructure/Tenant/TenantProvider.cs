namespace Platform.Core.Infrastructure.Tenant;

public sealed class TenantProvider : ITenantProvider
{
    private TenantInfo? _tenant;

    public TenantInfo? CurrentTenant => _tenant;

    public void SetTenant(TenantInfo tenant)
    {
        _tenant = tenant;
    }
}
