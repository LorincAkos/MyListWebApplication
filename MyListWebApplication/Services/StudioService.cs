using AutoMapper;
using MyListWebApplication.Models.DTOs;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Repositories.Interfaces;
using MyListWebApplication.Services.Interfaces;

namespace MyListWebApplication.Services
{
    public class StudioService(IStudioRepository studioRepository, IMapper mapper) : IStudioService
    {
        public List<StudioDto> GetRange()
        {
            List<StudioEntity> studios = studioRepository.GetRange();
            List<StudioDto> result = mapper.Map<List<StudioDto>>(studios);
            return result;
        }

        public List<StudioSelectDto> GetSelection()
        {
            List<StudioEntity> studios = studioRepository.GetRange();
            List<StudioSelectDto> result = mapper.Map<List<StudioSelectDto>>(studios);
            return result;
        }
    }
    
}
