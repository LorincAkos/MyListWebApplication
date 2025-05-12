using AutoMapper;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Repositories.Interfaces;
using MyListWebApplication.Services.Interfaces;

namespace MyListWebApplication.Services
{
    public class UserService(IUserRepository userRepository, IMapper mapper) : IUserService
    {
        public UserDto Get(string email, string password)
        {
            UserEntity user = userRepository.Get(email,password);
            UserDto result = mapper.Map<UserDto>(user);
            return result;
        }
    }
}
