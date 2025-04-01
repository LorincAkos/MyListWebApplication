using Microsoft.AspNetCore.Mvc;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Services.Interfaces;

namespace MyListWebApplication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AnimeController(IAnimeService animeService) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAnimeList()
        {
            List<AnimeDto> response = animeService.GetRange();
            return response is not null ? Ok(response) : NotFound();
        }

        [HttpGet]
        public IActionResult GetAnime(string id)
        {
            AnimeDto response = animeService.Get(id);
            return response is not null ? Ok(response) : NotFound();
        }
    }
}
