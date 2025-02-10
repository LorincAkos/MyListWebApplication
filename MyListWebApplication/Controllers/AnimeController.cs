using Microsoft.AspNetCore.Mvc;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Services.Interfaces;

namespace MyListWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimeController(IAnimeService animeService) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetRange()
        {
            List<AnimeDto> response = animeService.GetRange();

            return response is not null ? Ok(response) : NotFound();
        }
    }
}
