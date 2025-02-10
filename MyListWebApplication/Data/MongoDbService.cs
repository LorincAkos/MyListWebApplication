using MongoDB.Driver;

namespace MyListWebApplication.Data
{
    public class MongoDbService
    {
        private readonly IMongoDatabase _database;

        public MongoDbService(IConfiguration config)
        {
            string? connectionString = config["ConnectionStrings:DbConnection"];
            string? databaseName = config["ConnectionStrings:DatabaseName"];

            MongoClient client = new(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        public IMongoDatabase Database { get { return _database; } }

        public IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            return _database.GetCollection<T>(collectionName);
        }
    }
}
