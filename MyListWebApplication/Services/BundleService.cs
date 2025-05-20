using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Repositories.Interfaces;
using MyListWebApplication.Services.Interfaces;
using System.Collections.Generic;

namespace MyListWebApplication.Services
{
    public class BundleService(IBundleRepository bundleRepository, IMapper mapper) : IBundleService
    {
        public List<BundleDto> GetRange()
        {
            List<BundleEntity> entities = bundleRepository.GetRange();
            List<BundleDto> result = mapper.Map<List<BundleDto>>(entities);
            return result;
        }

        public BundleDto Get(string id)
        {
            BundleEntity entity = bundleRepository.Get(id);
            BundleDto result = mapper.Map<BundleDto>(entity);
             
            return result;
        }

        public void Add(BundleDto dto)
        {
            BundleEntity entity = mapper.Map<BundleEntity>(dto);
            bundleRepository.Add(entity);
        }

        public void Update(string id, BundleDto dto)
        {
            BundleEntity entity = mapper.Map<BundleEntity>(dto);
            bundleRepository.Update(id, entity);
        }

        public bool Delete(string id)
        {
            return bundleRepository.Delete(id);
        }
    }
}
