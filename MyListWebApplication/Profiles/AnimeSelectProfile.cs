using AutoMapper;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Profiles
{
    public class AnimeSelectProfile : Profile
    {
        public AnimeSelectProfile()
        {
            CreateMap<AnimeEntity, AnimeSelectDto>();
        }
    }
}
