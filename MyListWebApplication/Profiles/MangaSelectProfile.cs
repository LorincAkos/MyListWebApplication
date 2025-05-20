using AutoMapper;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Profiles
{
    public class MangaSelectProfile : Profile
    {
        public MangaSelectProfile()
        {
            CreateMap<MangaEntity, MangaSelectDto>();
        }
    }
}
