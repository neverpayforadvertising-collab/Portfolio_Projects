namespace EDIDS.Api.Models
{
    public class HealthSummary
    {
        public int ActiveIssues { get; set; }
        public int CriticalIssues { get; set; }
        public int Warnings { get; set; }
        public double AverageLatencyMs { get; set; }
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        public string Notes { get; set; } = "Pipeline health evaluation and anomaly detection are operating in observation mode.";
    }
}
