using MongoDB.Driver;
using MyListWebApplication.Data;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Repositories.Interfaces;

namespace MyListWebApplication.Repositories
{
    public class StudioRepository(MongoDbService mongoDbService) : IStudioRepository
    {
        private readonly IMongoCollection<StudioEntity> Studio = mongoDbService.GetCollection<StudioEntity>("Studio");

        public List<StudioEntity> GetRange()
        {
            return Studio.Find(FilterDefinition<StudioEntity>.Empty).ToList();
        }

    }
}
