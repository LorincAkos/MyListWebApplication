using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Services.Interfaces;

namespace MyListWebApplication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MangaController(IMangaService mangaService) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetMangaList()
        {
            List<MangaDto> response = mangaService.GetRange();
            return response is not null ? Ok(response) : NotFound();
        }

        [HttpGet]
        public IActionResult Getmanga(string id)
        {
            MangaDto response = mangaService.Get(id);
            return response is not null ? Ok(response) : NotFound();
        }

        [HttpGet]
        public IActionResult GetmangaSelectionList()
        {
            List<MangaSelectDto> response = mangaService.GetSelection();
            return response is not null ? Ok(response) : NotFound();
        }

        [HttpPost]
        public IActionResult AddManga([FromBody] MangaDto dto)
        {
            mangaService.Add(dto);
            return CreatedAtAction(nameof(AddManga), new { id = dto.Id }, dto);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateManga(string id, [FromBody] MangaDto dto)
        {
            mangaService.Update(id,dto);
            return CreatedAtAction(nameof(UpdateManga), new { id = dto.Id }, dto);
        }

        [HttpDelete]
        public IActionResult DeleteManga(string id)
        {
            return mangaService.Delete(id) ? Ok() : NotFound();
        }
    }
}
