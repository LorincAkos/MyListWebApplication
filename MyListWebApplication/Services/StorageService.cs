using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Repositories.Interfaces;
using MyListWebApplication.Services.Interfaces;
using System.Collections.Generic;

namespace MyListWebApplication.Services
{
    public class StorageService(IStorageRepository storageRepository, IMapper mapper) : IStorageService
    {
        public List<StorageDto> GetRange()
        {
            List<StorageEntity> entities = storageRepository.GetRange();
            List<StorageDto> result = mapper.Map<List<StorageDto>>(entities);
            return result;
        }

        public StorageDto Get(string id)
        {
            StorageEntity entity = storageRepository.Get(id);
            StorageDto result = mapper.Map<StorageDto>(entity);
             
            return result;
        }

        public void Add(StorageDto dto)
        {
            StorageEntity entity = mapper.Map<StorageEntity>(dto);
            storageRepository.Add(entity);
        }

        public void Update(string id, StorageDto dto)
        {
            StorageEntity entity = mapper.Map<StorageEntity>(dto);
            storageRepository.Update(id, entity);
        }

        public bool Delete(string id)
        {
            return storageRepository.Delete(id);
        }
    }
}
