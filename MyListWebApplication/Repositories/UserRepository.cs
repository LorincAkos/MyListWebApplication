using MongoDB.Driver;
using MyListWebApplication.Data;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Repositories.Interfaces;

namespace MyListWebApplication.Repositories
{
    public class UserRepository(MongoDbService mongoDbService) : IUserRepository
    {

        private readonly IMongoCollection<UserEntity> Users = mongoDbService.GetCollection<UserEntity>("User");
        public UserEntity Get(string name, string password)
        {
            return Users.Find(user => user.UserName == name && user.Password == password).FirstOrDefault();

        }
    }
}
