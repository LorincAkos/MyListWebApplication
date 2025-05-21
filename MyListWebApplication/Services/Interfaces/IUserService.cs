using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Services.Interfaces
{
    public interface IUserService
    {
        public UserDto GetUser(string email, string password);
        public bool ValidateUser(string username, string password);
        public UserEntity GetByUsername(string username);
        public UserEntity GetByEmail(string email);
        public void CreateUser(UserEntity user);
    }
}
