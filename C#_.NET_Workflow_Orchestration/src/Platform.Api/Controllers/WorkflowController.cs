using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.Core.Models;
using Platform.Core.Workflows;

namespace Platform.Api.Controllers;

[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
public sealed class WorkflowController : ControllerBase
{
    private readonly WorkflowEngine _workflowEngine;

    public WorkflowController(WorkflowEngine workflowEngine)
    {
        _workflowEngine = workflowEngine;
    }

    [HttpGet("{workflowId}")]
    [Authorize]
    public IActionResult GetDefinition(string workflowId)
    {
        var definition = new WorkflowDefinition
        {
            WorkflowId = workflowId,
            Name = "Expense Approval",
            Description = "Example tenant workflow definition.",
            States = new[]
            {
                new WorkflowState { StateId = "draft", DisplayName = "Draft" },
                new WorkflowState { StateId = "review", DisplayName = "Review" },
                new WorkflowState { StateId = "approved", DisplayName = "Approved", IsTerminal = true }
            },
            Transitions = new[]
            {
                new WorkflowTransition { FromStateId = "draft", ToStateId = "review", Condition = "submitted", Permission = "workflow.submit" },
                new WorkflowTransition { FromStateId = "review", ToStateId = "approved", Condition = "approved", Permission = "workflow.approve" }
            }
        };

        return Ok(ApiResponse<WorkflowDefinition>.Ok(definition));
    }

    [HttpPost("{workflowId}/execute")]
    [Authorize(Policy = "Workflow.Execute")]
    public async Task<IActionResult> Execute(string workflowId, [FromBody] Dictionary<string, object?> payload)
    {
        var definition = new WorkflowDefinition
        {
            WorkflowId = workflowId,
            Name = "Expense Approval",
            Description = "Example runtime workflow.",
            States = new[]
            {
                new WorkflowState { StateId = "draft", DisplayName = "Draft" },
                new WorkflowState { StateId = "review", DisplayName = "Review" },
                new WorkflowState { StateId = "approved", DisplayName = "Approved", IsTerminal = true }
            },
            Transitions = new[]
            {
                new WorkflowTransition { FromStateId = "draft", ToStateId = "review", Condition = "submitted", Permission = "workflow.submit" },
                new WorkflowTransition { FromStateId = "review", ToStateId = "approved", Condition = "approved", Permission = "workflow.approve" }
            }
        };

        var result = await _workflowEngine.ExecuteAsync(definition, payload, User);
        if (!result.Success)
        {
            return BadRequest(ApiResponse<string>.Fail(result.Message));
        }

        return Ok(ApiResponse<WorkflowExecutionMetadata>.Ok(result.Metadata!, "Workflow transition executed."));
    }
}
