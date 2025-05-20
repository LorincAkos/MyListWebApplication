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
        public AnimeEntity Get(string id)
        {
            return Anime.Find(Builders<AnimeEntity>.Filter.Eq(x => x.Id, id)).FirstOrDefault();
        }

        public void Add(AnimeEntity anime)
        {
            Anime.InsertOne(anime);
        }
        public void Update(string id, AnimeEntity entity)
        {
            if (Anime.Find(Builders<AnimeEntity>.Filter.Eq(x => x.Id, id)).FirstOrDefault() == null)
            {
                return;
            }
            Anime.ReplaceOne(m => m.Id == entity.Id, entity);
        }

        public bool Delete(string id)
        {
            var result = Anime.DeleteOne(m => m.Id == id);
            return result.DeletedCount > 0;
        }
    }
}
