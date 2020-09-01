using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

using Galizar.LeNotes.Infrastructure.Data;

namespace Galizar.LeNotes.Tests.IntegrationTests.EF.Services
{
  public static class TestDbOptionsBuilder
  {
    public static DbContextOptionsBuilder<LeNotesContext> GetDbOptionsBuilder()
    {
      string dbName = Guid.NewGuid().ToString();

      var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();

      var builder = new DbContextOptionsBuilder<LeNotesContext>();
      builder.UseInMemoryDatabase(dbName)
             .UseInternalServiceProvider(serviceProvider);

      return builder;
    }
  }
}