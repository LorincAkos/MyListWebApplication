using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Repositories;
using MyListWebApplication.Repositories.Interfaces;
using MyListWebApplication.Services.Interfaces;
using System.Collections.Generic;

namespace MyListWebApplication.Services
{
    public class AnimeService(IAnimeRepository animeRepository, IMapper mapper) : IAnimeService
    {
        public List<AnimeDto> GetRange()
        {
            List<AnimeEntity> animes = animeRepository.GetRange();
            List<AnimeDto> result = mapper.Map<List<AnimeDto>>(animes);
            return result;
        }

        public AnimeDto Get(string id)
        {
            AnimeEntity anime = animeRepository.Get(id);
            AnimeDto result = mapper.Map<AnimeDto>(anime);
             
            return result;
        }

        public List<AnimeSelectDto> GetSelection()
        {
            List<AnimeEntity> animes = animeRepository.GetRange();
            List<AnimeSelectDto> result = mapper.Map<List<AnimeSelectDto>>(animes);
            return result;
        }

        public void Add(AnimeDto dto)
        {
            AnimeEntity entity = mapper.Map<AnimeEntity>(dto);
            animeRepository.Add(entity);
        }
        public void Update(string id, AnimeDto dto)
        {
            AnimeEntity entity = mapper.Map<AnimeEntity>(dto);
            animeRepository.Update(id, entity);
        }

        public bool Delete(string id)
        {
            return animeRepository.Delete(id);
        }
    }
}
