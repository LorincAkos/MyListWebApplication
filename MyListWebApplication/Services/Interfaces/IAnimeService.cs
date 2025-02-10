using MyListWebApplication.Models.DTOs;

namespace MyListWebApplication.Services.Interfaces
{
    public interface IAnimeService
    {
        public List<AnimeDto> GetRange();
    }
}
