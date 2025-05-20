using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Services;
using MyListWebApplication.Services.Interfaces;

namespace MyListWebApplication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StorageController(IStorageService storageService) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetStorageList()
        {
            List<StorageDto> response = storageService.GetRange();
            return response is not null ? Ok(response) : NotFound();
        }

        [HttpGet]
        public IActionResult Get(string id)
        {
            StorageDto response = storageService.Get(id);
            return response is not null ? Ok(response) : NotFound();
        }

        [HttpPost]
        public IActionResult Add([FromBody] StorageDto dto)
        {
            storageService.Add(dto);
            return CreatedAtAction(nameof(Add), new { id = dto.Id }, dto);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] StorageDto dto)
        {
            storageService.Update(id, dto);
            return CreatedAtAction(nameof(Update), new { id = dto.Id }, dto);
        }

        [HttpDelete]
        public IActionResult Delete(string id)
        {
            return storageService.Delete(id) ? Ok() : NotFound();
        }
    }
}
