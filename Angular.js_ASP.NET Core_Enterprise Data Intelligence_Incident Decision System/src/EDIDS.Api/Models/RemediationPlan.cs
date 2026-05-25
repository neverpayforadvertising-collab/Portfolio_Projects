namespace EDIDS.Api.Models
{
    public class RemediationPlan
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string IncidentId { get; set; } = string.Empty;
        public string Action { get; set; } = string.Empty;
        public string Mode { get; set; } = string.Empty;
        public string Confidence { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
    }
}
