using System.Text.Json;

namespace Platform.Core.Workflows;

public sealed class WorkflowEngine
{
    private readonly ILogger<WorkflowEngine> _logger;

    public WorkflowEngine(ILogger<WorkflowEngine> logger)
    {
        _logger = logger;
    }

    public Task<WorkflowExecutionResult> ExecuteAsync(WorkflowDefinition definition, Dictionary<string, object?> payload, ClaimsPrincipal? user)
    {
        _logger.LogInformation("Executing workflow {WorkflowId} for user {UserId}", definition.WorkflowId, user?.Identity?.Name ?? "anonymous");

        var currentState = definition.States.FirstOrDefault(s => !s.IsTerminal)
            ?? definition.States.FirstOrDefault();

        if (currentState == null)
        {
            return Task.FromResult(WorkflowExecutionResult.Fail("Workflow definition has no states."));
        }

        var transition = definition.Transitions.FirstOrDefault(t => t.FromStateId == currentState.StateId && EvaluateCondition(t.Condition, payload));
        if (transition == null)
        {
            return Task.FromResult(WorkflowExecutionResult.Fail("No available transition found for current state."));
        }

        if (!string.IsNullOrWhiteSpace(transition.Permission) && user != null && !user.HasClaim("permission", transition.Permission))
        {
            return Task.FromResult(WorkflowExecutionResult.Fail("The current user is not authorized to advance this workflow."));
        }

        var nextState = definition.States.FirstOrDefault(s => s.StateId == transition.ToStateId);
        if (nextState == null)
        {
            return Task.FromResult(WorkflowExecutionResult.Fail("Target state is not defined."));
        }

        var metadata = new WorkflowExecutionMetadata
        {
            WorkflowId = definition.WorkflowId,
            FromState = currentState.StateId,
            ToState = nextState.StateId,
            Payload = JsonSerializer.Serialize(payload)
        };

        return Task.FromResult(WorkflowExecutionResult.Success(nextState.StateId, metadata));
    }

    private static bool EvaluateCondition(string condition, Dictionary<string, object?> payload)
    {
        if (string.IsNullOrWhiteSpace(condition))
        {
            return true;
        }

        if (payload.TryGetValue(condition, out var value) && value is bool boolValue)
        {
            return boolValue;
        }

        return false;
    }
}

public sealed class WorkflowExecutionResult
{
    public bool Success { get; init; }
    public string Message { get; init; } = string.Empty;
    public string? NextStateId { get; init; }
    public WorkflowExecutionMetadata? Metadata { get; init; }

    public static WorkflowExecutionResult Success(string nextStateId, WorkflowExecutionMetadata metadata) => new() { Success = true, NextStateId = nextStateId, Metadata = metadata };
    public static WorkflowExecutionResult Fail(string message) => new() { Success = false, Message = message };
}

public sealed class WorkflowExecutionMetadata
{
    public string WorkflowId { get; init; } = string.Empty;
    public string FromState { get; init; } = string.Empty;
    public string ToState { get; init; } = string.Empty;
    public string Payload { get; init; } = string.Empty;
}
