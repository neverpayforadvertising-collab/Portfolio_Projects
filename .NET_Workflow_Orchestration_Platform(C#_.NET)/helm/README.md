# Helm Deployment

This directory is reserved for Helm charts that deploy the multi-tenant SaaS platform to Kubernetes.

Suggested chart structure:

- `Chart.yaml`
- `values.yaml`
- `templates/deployment.yaml`
- `templates/service.yaml`
- `templates/secret.yaml`
- `templates/hpa.yaml`

Use secure secret injection and environment-specific overrides for AAD settings, database connections, and message broker configuration.
