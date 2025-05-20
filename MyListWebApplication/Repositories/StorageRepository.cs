using MongoDB.Driver;
using MyListWebApplication.Data;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Repositories.Interfaces;
using System.Xml.Linq;

namespace MyListWebApplication.Repositories
{
    public class StorageRepository(MongoDbService mongoDbService) : IStorageRepository
    {
        private readonly IMongoCollection<StorageEntity> Storage = mongoDbService.GetCollection<StorageEntity>("Storage");

        public List<StorageEntity> GetRange()
        {
            return Storage.Find(FilterDefinition<StorageEntity>.Empty).ToList();
        }
        public StorageEntity Get(string id)
        {
            return Storage.Find(Builders<StorageEntity>.Filter.Eq(x => x.Id, id)).FirstOrDefault();
        }
        public void Add(StorageEntity entity)
        {
            Storage.InsertOne(entity);
        }

        public void Update(string id, StorageEntity entity)
        {
            if (Storage.Find(Builders<StorageEntity>.Filter.Eq(x => x.Id, id)).FirstOrDefault() == null)
            {
                return;
            }
            Storage.ReplaceOne(m => m.Id == entity.Id, entity);
        }
        public bool Delete(string id)
        {
            var result = Storage.DeleteOne(m => m.Id == id);
            return result.DeletedCount > 0;
        }
    }
}
