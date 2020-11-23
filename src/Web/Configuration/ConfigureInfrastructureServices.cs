using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;
using Galizar.LeNotes.Infrastructure.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Galizar.LeNotes.Web.Configuration
{
    public static class ConfigureInfrastructureServices
    {
        public static void Configure(IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<PasswordHasherOptions>(options =>
            {
                options.CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV3;
                options.IterationCount = 20000;
            });
            services.AddSingleton<IPasswordHasher<User>, PasswordHasher<User>>();
            services.AddSingleton<ILeNotesPasswordHasher, IdentityPasswordHasher>();
        }
        
    }
}