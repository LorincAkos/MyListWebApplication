using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Services;
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

        [HttpGet]
        public IActionResult GetAnimeSelectionList()
        {
            List<AnimeSelectDto> response = animeService.GetSelection();
            return response is not null ? Ok(response) : NotFound();
        }

        [HttpPost]
        public IActionResult AddAnime([FromBody] AnimeDto dto)
        {
            animeService.Add(dto);
            return CreatedAtAction(nameof(AddAnime), new { id = dto.Id }, dto);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAnime(string id, [FromBody] AnimeDto dto)
        {
            animeService.Update(id, dto);
            return CreatedAtAction(nameof(UpdateAnime), new { id = dto.Id }, dto);
        }

        [HttpDelete]
        public IActionResult DeleteAnime(string id)
        {
            return animeService.Delete(id) ? Ok() : NotFound();
        }
    }
}
