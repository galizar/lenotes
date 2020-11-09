using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;

namespace Galizar.LeNotes.Web.Controllers
{
    [ApiController]
    [Route("app")]
    public class SPAController
    {
        [HttpGet]
        public IActionResult GetSpa([FromServices] IWebHostEnvironment env)
        {
            var filePath =
                Path.Combine(env.ContentRootPath, "static", "index.html");

            return new PhysicalFileResult(filePath, "text/html");
        }
    }
}