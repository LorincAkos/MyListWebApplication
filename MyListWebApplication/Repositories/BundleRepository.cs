using MongoDB.Driver;
using MyListWebApplication.Data;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Repositories.Interfaces;
using System.Xml.Linq;

namespace MyListWebApplication.Repositories
{
    public class BundleRepository(MongoDbService mongoDbService) : IBundleRepository
    {
        private readonly IMongoCollection<BundleEntity> Bundle = mongoDbService.GetCollection<BundleEntity>("Bundle");

        public List<BundleEntity> GetRange()
        {
            return Bundle.Find(FilterDefinition<BundleEntity>.Empty).ToList();
        }
        public BundleEntity Get(string id)
        {
            return Bundle.Find(Builders<BundleEntity>.Filter.Eq(x => x.Id, id)).FirstOrDefault();
        }
        public void Add(BundleEntity entity)
        {
            Bundle.InsertOne(entity);
        }

        public void Update(string id, BundleEntity entity)
        {
            if (Bundle.Find(Builders<BundleEntity>.Filter.Eq(x => x.Id, id)).FirstOrDefault() == null)
            {
                return;
            }
            Bundle.ReplaceOne(m => m.Id == entity.Id, entity);
        }
        public bool Delete(string id)
        {
            var result = Bundle.DeleteOne(m => m.Id == id);
            return result.DeletedCount > 0;
        }
    }
}
