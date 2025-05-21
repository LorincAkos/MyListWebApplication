using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Services;
using MyListWebApplication.Services.Interfaces;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Data;
using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService userService, IConfiguration _config) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUser(string email, string password)
        {
            var passwordHash = UserService.ComputeSha256Hash(password);
            UserDto response = userService.GetUser(email,passwordHash);
            return response is not null ? Ok(response) : NotFound();
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (!userService.ValidateUser(request.Username, request.Password))
                return Unauthorized();

            UserDto dto = userService.GetUser(request.Username, request.Password);
            if(dto == null)
            {
                return Unauthorized();
            }
            var token = GenerateJwtToken(dto);
            return Ok(new { token });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            var existingUser = userService.GetByUsername(request.Username);
            if (existingUser != null)
            {
                return BadRequest(new { message = "Username already exist." });
            }

            var existingEmail = userService.GetByUsername(request.Username);
            if (existingEmail != null)
            {
                return BadRequest(new { message = "Email already exist." });
            }

            var passwordHash = UserService.ComputeSha256Hash(request.Password);

            var newUser = new UserEntity
            {
                UserName = request.Username,
                Password = passwordHash,
                IsAdmin = false,
                Email = request.Email,
                FinishedAnime = [],

            };

            userService.CreateUser(newUser);

            return Ok(new { message = "User registered successfully." });
        }

        private string GenerateJwtToken(UserDto user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim("name", user.UserName),
                new Claim("email", user.Email),
                new Claim("admin", user.IsAdmin.ToString()),
                new Claim("finishedAnime", string.Join("|||", user.FinishedAnime))
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class RegisterRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
