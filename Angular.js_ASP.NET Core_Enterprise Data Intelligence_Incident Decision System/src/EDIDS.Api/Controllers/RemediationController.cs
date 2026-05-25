using EDIDS.Api.Models;
using EDIDS.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace EDIDS.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RemediationController : ControllerBase
    {
        private readonly RemediationEngine _engine;

        public RemediationController(RemediationEngine engine)
        {
            _engine = engine;
        }

        [HttpGet("plans")]
        public ActionResult<IEnumerable<RemediationPlan>> GetPlans()
        {
            return Ok(_engine.SuggestRemediations());
        }

        [HttpPost("execute/{incidentId}")]
        public ActionResult ExecuteRemediation(string incidentId)
        {
            var success = _engine.ExecuteAutoRemediation(incidentId);
            return success ? Ok(new { message = "Auto-remediation initiated." }) : BadRequest(new { message = "No remediation policy matched." });
        }
    }
}
