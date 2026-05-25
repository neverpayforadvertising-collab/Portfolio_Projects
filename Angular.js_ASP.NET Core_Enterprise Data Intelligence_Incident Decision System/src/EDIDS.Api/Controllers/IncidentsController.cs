using EDIDS.Api.Models;
using EDIDS.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace EDIDS.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IncidentsController : ControllerBase
    {
        private readonly IncidentCorrelationEngine _correlation;
        private readonly BusinessImpactAnalyzer _impact;
        private readonly NlpSummaryService _nlp;

        public IncidentsController(
            IncidentCorrelationEngine correlation,
            BusinessImpactAnalyzer impact,
            NlpSummaryService nlp)
        {
            _correlation = correlation;
            _impact = impact;
            _nlp = nlp;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Incident>> GetIncidents()
        {
            var incidents = _correlation.BuildIncidentStories();

            foreach (var incident in incidents)
            {
                incident.Impact = _impact.Analyze(incident);
                incident.NaturalLanguageSummary = _nlp.GenerateSummary(incident);
            }

            return Ok(incidents);
        }

        [HttpGet("{id}")]
        public ActionResult<Incident?> GetIncident(string id)
        {
            var incident = _correlation.BuildIncidentStories().FirstOrDefault(i => i.Id == id);
            if (incident is null)
            {
                return NotFound();
            }

            incident.Impact = _impact.Analyze(incident);
            incident.NaturalLanguageSummary = _nlp.GenerateSummary(incident);
            return Ok(incident);
        }
    }
}
