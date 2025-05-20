using MyListWebApplication.Models.Enums;

namespace MyListWebApplication.Models.DTOs
{
    public class StorageDto
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string ImgUrl { get; set; } = string.Empty;
        public int Volume { get; set; }
        public int Count { get; set; }
        public int Price { get; set; }
    }
}
