using MyListWebApplication.Models.DTOs;

namespace MyListWebApplication.Services.Interfaces
{
    public interface IStorageService
    {
        public List<StorageDto> GetRange();
        public StorageDto Get(string id);
        public void Add(StorageDto dto);
        public void Update(string id, StorageDto dto);
        public bool Delete(string id);
    }
}
