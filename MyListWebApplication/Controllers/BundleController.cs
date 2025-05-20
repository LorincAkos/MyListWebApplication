using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Services;
using MyListWebApplication.Services.Interfaces;

namespace MyListWebApplication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BundleController(IBundleService bundleService) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetBundleList()
        {
            List<BundleDto> response = bundleService.GetRange();
            return response is not null ? Ok(response) : NotFound();
        }

        [HttpGet]
        public IActionResult Get(string id)
        {
            BundleDto response = bundleService.Get(id);
            return response is not null ? Ok(response) : NotFound();
        }

        [HttpPost]
        public IActionResult Add([FromBody] BundleDto dto)
        {
            bundleService.Add(dto);
            return CreatedAtAction(nameof(Add), new { id = dto.Id }, dto);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] BundleDto dto)
        {
            bundleService.Update(id, dto);
            return CreatedAtAction(nameof(Update), new { id = dto.Id }, dto);
        }

        [HttpDelete]
        public IActionResult Delete(string id)
        {
            return bundleService.Delete(id) ? Ok() : NotFound();
        }
    }
}
