using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Galizar.LeNotes.Core.Services;
using Galizar.LeNotes.Infrastructure.Data;
using Galizar.LeNotes.Core.Interfaces;

namespace Galizar.LeNotes.Web.Configuration
{
  public static class ConfigureCoreServices
  {
    public static void Configure(IServiceCollection services, IConfiguration configuration)
    {
      services.AddScoped(typeof(IAsyncRepository<>), typeof(EfRepository<>));
      services.AddScoped<IGroupService, GroupService>();
      services.AddScoped<INoteService, NoteService>();
    }
  }
}