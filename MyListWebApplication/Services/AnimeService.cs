using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;
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
    }
}
