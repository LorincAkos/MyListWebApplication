using MongoDB.Driver;
using MyListWebApplication.Data;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Repositories.Interfaces;

namespace MyListWebApplication.Repositories
{
    public class MangaRepository(MongoDbService mongoDbService) : IMangaRepository
    {
        private readonly IMongoCollection<MangaEntity> Manga = mongoDbService.GetCollection<MangaEntity>("Manga");


        public List<MangaEntity> GetRange()
        {
            return Manga.Find(FilterDefinition<MangaEntity>.Empty).ToList();
        }
        public MangaEntity Get(string id)
        {
            return Manga.Find(Builders<MangaEntity>.Filter.Eq(x => x.Id, id)).FirstOrDefault();
        }

        public void Add(MangaEntity entity)
        {
            Manga.InsertOne(entity);
        }

        public void Update(string id, MangaEntity entity)
        {
            if(Manga.Find(Builders<MangaEntity>.Filter.Eq(x => x.Id, id)).FirstOrDefault() == null)
            {
                return;
            }
            Manga.ReplaceOne(m => m.Id == entity.Id, entity);
        }

        public bool Delete(string id)
        {
            var result = Manga.DeleteOne(m => m.Id ==  id);
            return result.DeletedCount > 0;
        }
    }
}
