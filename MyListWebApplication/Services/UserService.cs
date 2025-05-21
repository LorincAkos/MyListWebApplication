using AutoMapper;
using MongoDB.Driver;
using MyListWebApplication.Data;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Repositories.Interfaces;
using MyListWebApplication.Services.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace MyListWebApplication.Services
{
    public class UserService(MongoDbService db,IUserRepository userRepository, IMapper mapper) : IUserService
    {
        public UserDto GetUser(string name, string password)
        {
            var passwordHash = UserService.ComputeSha256Hash(password);
            UserEntity user = userRepository.Get(name,passwordHash);
            UserDto result = mapper.Map<UserDto>(user);
            return result;
        }

        private readonly IMongoCollection<UserEntity> _users = db.GetCollection<UserEntity>("User");

        public UserEntity GetByUsername(string username)
        {
            return  _users.Find(u => u.UserName == username).FirstOrDefault();
        }

        public UserEntity GetByEmail(string email)
        {
            return _users.Find(u => u.Email == email).FirstOrDefault();
        }

        public bool ValidateUser(string username, string password)
        {
            var user =  GetByUsername(username);
            if (user == null) return false;

            var passwordHash = ComputeSha256Hash(password);
            return user.Password == passwordHash;
        }

        public void CreateUser(UserEntity user)
        {
             _users.InsertOne(user);
        }

        public static string ComputeSha256Hash(string raw)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(raw));
            return BitConverter.ToString(bytes).Replace("-", "").ToLower();
        }
    }
}
