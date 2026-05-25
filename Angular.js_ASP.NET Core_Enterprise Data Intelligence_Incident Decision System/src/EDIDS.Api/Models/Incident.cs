namespace EDIDS.Api.Models
{
    public class Incident
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; } = string.Empty;
        public string RootCauseCategory { get; set; } = string.Empty;
        public string SeverityLabel { get; set; } = string.Empty;
        public int SeverityScore { get; set; }
        public DateTime DetectedAt { get; set; } = DateTime.UtcNow;
        public List<string> AffectedEntities { get; set; } = new();
        public List<string> Timeline { get; set; } = new();
        public BusinessImpact? Impact { get; set; }
        public string NaturalLanguageSummary { get; set; } = string.Empty;
        public string Status { get; set; } = "Open";
    }
}
