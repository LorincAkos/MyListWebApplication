using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Services.Interfaces
{
    public interface IStudioService
    {
        public List<StudioDto> GetRange();
    }
}
