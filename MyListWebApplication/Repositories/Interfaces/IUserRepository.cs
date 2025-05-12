using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public UserEntity Get(string email, string password);
    }
}
