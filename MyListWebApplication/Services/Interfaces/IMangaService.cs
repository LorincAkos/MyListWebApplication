using MyListWebApplication.Models.DTOs;

namespace MyListWebApplication.Services.Interfaces
{
    public interface IMangaService
    {
        public List<MangaDto> GetRange();
        public MangaDto Get(string id);
        public List<MangaSelectDto> GetSelection();
        public void Add(MangaDto dto);
        public void Update(string id, MangaDto dto);
        public bool Delete(string id);
    }
}
