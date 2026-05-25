using EDIDS.Api.Models;
using EDIDS.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace EDIDS.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        private readonly DataHealthIntelEngine _engine;

        public HealthController(DataHealthIntelEngine engine)
        {
            _engine = engine;
        }

        [HttpGet("issues")]
        public ActionResult<IEnumerable<DataHealthIssue>> GetIssues()
        {
            return Ok(_engine.EvaluateCurrentHealth());
        }

        [HttpGet("summary")]
        public ActionResult<HealthSummary> GetSummary()
        {
            return Ok(_engine.GetSummary());
        }
    }
}
