using MongoDB.Driver;
using MyListWebApplication.Data;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Repositories.Interfaces;

namespace MyListWebApplication.Repositories
{
    public class UserRepository(MongoDbService mongoDbService) : IUserRepository
    {

        private readonly IMongoCollection<UserEntity> Users = mongoDbService.GetCollection<UserEntity>("User");
        public UserEntity Get(string email, string password)
        {
            return Users.Find(user => user.Email == email && user.Password == password).FirstOrDefault();

        }
    }
}
