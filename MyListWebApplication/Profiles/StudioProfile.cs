using AutoMapper;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Profiles
{
    public class StudioProfile: Profile
    {
        public StudioProfile()
        {
            CreateMap<StudioEntity, StudioDto>();
        }
    }
}
