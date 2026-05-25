using Microsoft.AspNetCore.Mvc;
using Platform.Core.Models;

namespace Platform.Api.Controllers;

[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
public sealed class HealthController : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public IActionResult Get() => Ok(ApiResponse<string>.Ok("Healthy"));
}
