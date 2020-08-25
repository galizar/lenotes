using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;
using Galizar.LeNotes.Core.Services.EF;
using Galizar.LeNotes.Core.Services.Local;

namespace Galizar.LeNotes.Web.Configuration
{
  public static class ConfigureCoreServices
  {
    public static void Configure(IServiceCollection services, IConfiguration configuration)
    {
      services.AddScoped<IGroupService, GroupService>();
      services.AddScoped<INoteService, NoteService>();
      services.AddSingleton<ISelectionService<Group>, SelectionService<Group>>();
      services.AddSingleton<ISelectionService<Note>, SelectionService<Note>>();
    }
  }
}