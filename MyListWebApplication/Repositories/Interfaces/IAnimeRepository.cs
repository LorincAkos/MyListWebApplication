using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Repositories.Interfaces
{
    public interface IAnimeRepository
    {
        public List<AnimeEntity> GetRange();
        public AnimeEntity Get(string id);
        public void Add(AnimeEntity anime);
        public void Update(string id, AnimeEntity entity);
        public bool Delete(string id);
    }
}
