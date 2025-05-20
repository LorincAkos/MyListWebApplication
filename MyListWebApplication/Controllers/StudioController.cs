using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Services.Interfaces;

namespace MyListWebApplication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StudioController(IStudioService studioService) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetRange()
        {
            List<StudioDto> response = studioService.GetRange();

            return response is not null ? Ok(response) : NotFound();
        }

        [HttpGet]
        public IActionResult GetSelection()
        {
            List<StudioSelectDto> response = studioService.GetSelection();

            return response is not null ? Ok(response) : NotFound();
        }
    }
}
