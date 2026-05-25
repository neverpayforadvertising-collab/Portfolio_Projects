using Microsoft.AspNetCore.Authorization;
using Platform.Core.Identity;

namespace Platform.Core.Authorization;

public sealed class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
    {
        if (context.User == null)
        {
            context.Fail();
            return Task.CompletedTask;
        }

        if (context.User.HasPermission(requirement.Permission))
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }

        context.Fail();
        return Task.CompletedTask;
    }
}
