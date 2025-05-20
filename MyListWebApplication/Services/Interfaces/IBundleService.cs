using MyListWebApplication.Models.DTOs;

namespace MyListWebApplication.Services.Interfaces
{
    public interface IBundleService
    {
        public List<BundleDto> GetRange();
        public BundleDto Get(string id);
        public void Add(BundleDto dto);
        public void Update(string id, BundleDto dto);
        public bool Delete(string id);
    }
}
