using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Repositories.Interfaces
{
    public interface IBundleRepository
    {
        public List<BundleEntity> GetRange();
        public BundleEntity Get(string id);
        public void Add(BundleEntity entity);
        public void Update(string id, BundleEntity entity);
        public bool Delete(string id);
    }
}
