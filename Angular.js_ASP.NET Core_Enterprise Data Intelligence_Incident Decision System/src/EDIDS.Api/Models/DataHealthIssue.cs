namespace EDIDS.Api.Models
{
    public class DataHealthIssue
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Source { get; set; } = string.Empty;
        public string Dataset { get; set; } = string.Empty;
        public string IssueType { get; set; } = string.Empty;
        public string RootCause { get; set; } = string.Empty;
        public int SeverityScore { get; set; }
        public double BusinessImpactScore { get; set; }
        public DateTime DetectedAt { get; set; } = DateTime.UtcNow;
        public string Description { get; set; } = string.Empty;
    }
}
