using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Repositories.Interfaces
{
    public interface IStorageRepository
    {
        public List<StorageEntity> GetRange();
        public StorageEntity Get(string id);
        public void Add(StorageEntity entity);
        public void Update(string id, StorageEntity entity);
        public bool Delete(string id);
    }
}
