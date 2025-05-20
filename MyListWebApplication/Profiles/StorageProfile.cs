using AutoMapper;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Profiles
{
    public class StorageProfile : Profile
    {
        public StorageProfile()
        {
            CreateMap<StorageEntity, StorageDto>();
            CreateMap<StorageDto, StorageEntity>();
        }
    }
}
