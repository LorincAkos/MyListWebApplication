using AutoMapper;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Profiles
{
    public class StudioSelectProfile: Profile
    {
        public StudioSelectProfile()
        {
            CreateMap<StudioEntity, StudioSelectDto>();
        }
    }
}
