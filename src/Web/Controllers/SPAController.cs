using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Galizar.LeNotes.Web.Controllers
{
    [ApiController]
    [Route("app")]
    public class SPAController
    {
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetSpa([FromServices] IWebHostEnvironment env)
        {
            var filePath =
                Path.Combine(env.ContentRootPath, "static", "index.html");

            return new PhysicalFileResult(filePath, "text/html");
        }
    }
}