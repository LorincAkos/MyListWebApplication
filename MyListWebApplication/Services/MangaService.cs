using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Repositories.Interfaces;
using MyListWebApplication.Services.Interfaces;
using System.Collections.Generic;

namespace MyListWebApplication.Services
{
    public class MangaService(IMangaRepository mangaRepository, IMapper mapper) : IMangaService
    {
        public List<MangaDto> GetRange()
        {
            List<MangaEntity> animes = mangaRepository.GetRange();
            List<MangaDto> result = mapper.Map<List<MangaDto>>(animes);
            return result;
        }

        public MangaDto Get(string id)
        {
            MangaEntity anime = mangaRepository.Get(id);
            MangaDto result = mapper.Map<MangaDto>(anime);
             
            return result;
        }

        public List<MangaSelectDto> GetSelection()
        {
            List<MangaEntity> animes = mangaRepository.GetRange();
            List<MangaSelectDto> result = mapper.Map<List<MangaSelectDto>>(animes);
            return result;
        }

        public void Add(MangaDto dto)
        {
            MangaEntity entity = mapper.Map<MangaEntity>(dto);
            mangaRepository.Add(entity);
        }

        public void Update(string id, MangaDto dto)
        {
            MangaEntity entity = mapper.Map<MangaEntity>(dto);
            mangaRepository.Update(id, entity);
        }

        public bool Delete(string id)
        {
            return mangaRepository.Delete(id);
        }
    }
}
