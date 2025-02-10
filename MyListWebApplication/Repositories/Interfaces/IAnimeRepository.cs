using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Repositories.Interfaces
{
    public interface IAnimeRepository
    {
        public List<AnimeEntity> GetRange();
    }
}
