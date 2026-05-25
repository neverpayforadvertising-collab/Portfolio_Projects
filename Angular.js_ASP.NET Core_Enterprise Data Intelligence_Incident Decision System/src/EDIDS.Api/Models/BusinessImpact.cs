namespace EDIDS.Api.Models
{
    public class BusinessImpact
    {
        public string AffectedDashboard { get; set; } = string.Empty;
        public string Kpi { get; set; } = string.Empty;
        public double EstimatedDistortionPercentage { get; set; }
        public string EstimatedCostImpact { get; set; } = string.Empty;
        public List<string> AffectedTeams { get; set; } = new();
        public string ImpactSummary { get; set; } = string.Empty;
    }
}
