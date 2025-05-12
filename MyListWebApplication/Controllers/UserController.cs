using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Services;
using MyListWebApplication.Services.Interfaces;

namespace MyListWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService userService) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUser(string email, string password)
        {
            UserDto response = userService.Get(email,password);
            return response is not null ? Ok(response) : NotFound();
        }
    }
}
