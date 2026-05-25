namespace Platform.Core.Events;

public sealed class AuditEvent
{
    public Guid EventId { get; init; } = Guid.NewGuid();
    public DateTimeOffset Timestamp { get; init; } = DateTimeOffset.UtcNow;
    public string TenantId { get; init; } = string.Empty;
    public string UserId { get; init; } = string.Empty;
    public string Action { get; init; } = string.Empty;
    public string Resource { get; init; } = string.Empty;
    public string Details { get; init; } = string.Empty;
    public string CorrelationId { get; init; } = string.Empty;
}
