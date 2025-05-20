using AutoMapper;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Profiles
{
    public class BundleProfile : Profile
    {
        public BundleProfile()
        {
            CreateMap<BundleEntity, BundleDto>();
            CreateMap<BundleDto, BundleEntity>();
        }
    }
}
