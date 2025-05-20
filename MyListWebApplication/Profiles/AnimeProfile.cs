using AutoMapper;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Profiles
{
    public class AnimeProfile : Profile
    {
        public AnimeProfile()
        {
            CreateMap<AnimeEntity, AnimeDto>()
                .ForMember(dest => dest.StartDate,
                    opt => opt.MapFrom(src => src.StartDate.ToLocalTime().ToString("yyyy-MM-dd"))); ;
            CreateMap<AnimeDto, AnimeEntity>();
        }
    }
}
