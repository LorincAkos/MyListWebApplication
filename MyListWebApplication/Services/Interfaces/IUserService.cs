using MyListWebApplication.Models.DTOs;

namespace MyListWebApplication.Services.Interfaces
{
    public interface IUserService
    {
        public UserDto Get(string email, string password);
    }
}
