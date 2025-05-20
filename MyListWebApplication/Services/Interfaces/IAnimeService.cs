using MyListWebApplication.Models.DTOs;

namespace MyListWebApplication.Services.Interfaces
{
    public interface IAnimeService
    {
        public List<AnimeDto> GetRange();
        public AnimeDto Get(string id);
        public List<AnimeSelectDto> GetSelection();
        public void Add(AnimeDto dto);
        public void Update(string id, AnimeDto dto);
        public bool Delete(string id);
    }
}
