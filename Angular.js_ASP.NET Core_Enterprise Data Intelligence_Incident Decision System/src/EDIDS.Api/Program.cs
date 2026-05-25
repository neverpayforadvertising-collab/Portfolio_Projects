using EDIDS.Api.Services;
using Microsoft.OpenApi.Models;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "EDIDS API",
        Version = "v1",
        Description = "Enterprise Data Intelligence & Incident Decision System API"
    });
});

builder.Services.AddSingleton<DataHealthIntelEngine>();
builder.Services.AddSingleton<IncidentCorrelationEngine>();
builder.Services.AddSingleton<BusinessImpactAnalyzer>();
builder.Services.AddSingleton<RemediationEngine>();
builder.Services.AddSingleton<NlpSummaryService>();

builder.Services.AddOpenTelemetryTracing(tracerProviderBuilder =>
{
    tracerProviderBuilder
        .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("EDIDS.Api"))
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddConsoleExporter();
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
