using MongoDB.Driver;
using MyListWebApplication.Data;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Repositories.Interfaces;

namespace MyListWebApplication.Repositories
{
    public class AnimeRepository(MongoDbService mongoDbService) : IAnimeRepository
    {
        private readonly IMongoCollection<AnimeEntity> Anime = mongoDbService.GetCollection<AnimeEntity>("Anime");

        public List<AnimeEntity> GetRange()
        {
            return Anime.Find(FilterDefinition<AnimeEntity>.Empty).ToList();
        }
    }
}
