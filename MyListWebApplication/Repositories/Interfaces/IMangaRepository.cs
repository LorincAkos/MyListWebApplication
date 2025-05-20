using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Repositories.Interfaces
{
    public interface IMangaRepository
    {
        public List<MangaEntity> GetRange();
        public MangaEntity Get(string id);
        public void Add(MangaEntity entity);
        public void Update(string id, MangaEntity entity);
        public bool Delete(string id);
    }
}
