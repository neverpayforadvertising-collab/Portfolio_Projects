namespace Platform.Core.Infrastructure.Tenant;

public interface ITenantProvider
{
    TenantInfo? CurrentTenant { get; }
    void SetTenant(TenantInfo tenant);
}
