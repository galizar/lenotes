using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Galizar.LeNotes.Core.Interfaces;
using Web.DTOs;

namespace Galizar.LeNotes.Web.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        public IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpPost]
        public async Task<ActionResult<AuthSuccessDTO>> SignUp([FromBody] SignUpDTO dto)
        {
            return new AuthSuccessDTO("dummy");
        }
    }
}