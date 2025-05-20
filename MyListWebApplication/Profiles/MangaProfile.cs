using AutoMapper;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Profiles
{
    public class MangaProfile : Profile
    {
        public MangaProfile()
        {
            CreateMap<MangaEntity, MangaDto>()
                .ForMember(dest => dest.StartDate,
                    opt => opt.MapFrom(src => src.StartDate.ToLocalTime().ToString("yyyy-MM-dd"))); ;
            CreateMap<MangaDto, MangaEntity>();
        }
    }
}
