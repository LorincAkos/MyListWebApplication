using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Repositories.Interfaces
{
    public interface IStudioRepository
    {
        public List<StudioEntity> GetRange();
    }
}
