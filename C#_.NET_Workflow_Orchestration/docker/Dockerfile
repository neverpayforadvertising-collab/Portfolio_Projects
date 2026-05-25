FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["PlatformOrchestration.sln", "./"]
COPY ["src/Platform.Api/Platform.Api.csproj", "src/Platform.Api/"]
COPY ["src/Platform.Core/Platform.Core.csproj", "src/Platform.Core/"]
COPY ["src/Platform.Modules.Workflows/Platform.Modules.Workflows.csproj", "src/Platform.Modules.Workflows/"]
COPY ["src/Platform.Modules.Audit/Platform.Modules.Audit.csproj", "src/Platform.Modules.Audit/"]
COPY ["src/Platform.Modules.Users/Platform.Modules.Users.csproj", "src/Platform.Modules.Users/"]
COPY ["src/Platform.Modules.Tasks/Platform.Modules.Tasks.csproj", "src/Platform.Modules.Tasks/"]
RUN dotnet restore "src/Platform.Api/Platform.Api.csproj"
COPY . .
WORKDIR /src/src/Platform.Api
RUN dotnet publish "Platform.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Platform.Api.dll"]
