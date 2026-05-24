# Multi-Tenant SaaS API Platform for Business Workflows

A cloud-native, multi-tenant SaaS backend scaffold built with ASP.NET Core following a modular, domain-driven architecture.

## Features

- Multi-tenant middleware and tenant resolution via header, JWT claim, and subdomain.
- Azure AD / JWT-based authentication with claims-driven authorization.
- Custom role/permission layer and centralized policy enforcement.
- Dynamic workflow engine with runtime workflow definitions.
- API versioning, standardized response contract, and modular controller design.
- Background hosted worker for async workflow execution.
- Docker and Helm scaffolding for containerized deployments.

## Structure

- `src/Platform.Api` - Web API and integration boundaries.
- `src/Platform.Core` - Shared domain model, tenant infrastructure, authorization, and workflow engine.
- `src/Platform.Modules.*` - Independent modules for users, workflows, audit, and tasks.

## Getting Started

1. Install .NET SDK 8.0 or later.
2. Restore packages:
   ```powershell
   dotnet restore
   ```
3. Build the solution:
   ```powershell
   dotnet build
   ```
4. Run the API:
   ```powershell
   dotnet run --project src/Platform.Api/Platform.Api.csproj
   ```

## Notes

This repository is a starter architecture for a reusable enterprise workflow automation platform. Implement production-specific Azure AD configuration, database integration, and observability wiring before deploying.
