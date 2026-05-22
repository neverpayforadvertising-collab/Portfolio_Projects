using Platform.Core.Workflows;

namespace Platform.Api.Background;

public sealed class WorkflowWorker : BackgroundService
{
    private readonly ILogger<WorkflowWorker> _logger;
    private readonly WorkflowEngine _workflowEngine;

    public WorkflowWorker(ILogger<WorkflowWorker> logger, WorkflowEngine workflowEngine)
    {
        _logger = logger;
        _workflowEngine = workflowEngine;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Workflow worker started.");

        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(TimeSpan.FromSeconds(15), stoppingToken);
            _logger.LogDebug("Polling for queued workflow tasks.");
            // Here you would dequeue a message from Service Bus / RabbitMQ and process it.
        }

        _logger.LogInformation("Workflow worker stopping.");
    }
}
