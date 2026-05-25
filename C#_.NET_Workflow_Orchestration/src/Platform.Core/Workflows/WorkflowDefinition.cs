namespace Platform.Core.Workflows;

public sealed class WorkflowDefinition
{
    public string WorkflowId { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public IReadOnlyList<WorkflowState> States { get; init; } = Array.Empty<WorkflowState>();
    public IReadOnlyList<WorkflowTransition> Transitions { get; init; } = Array.Empty<WorkflowTransition>();
}

public sealed class WorkflowState
{
    public string StateId { get; init; } = string.Empty;
    public string DisplayName { get; init; } = string.Empty;
    public bool IsTerminal { get; init; }
}

public sealed class WorkflowTransition
{
    public string FromStateId { get; init; } = string.Empty;
    public string ToStateId { get; init; } = string.Empty;
    public string Condition { get; init; } = string.Empty;
    public string Permission { get; init; } = string.Empty;
}
