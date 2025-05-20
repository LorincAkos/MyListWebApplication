using MyListWebApplication.Models.Enums;

namespace MyListWebApplication.Models.DTOs
{
    public class BundleDto
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string ImgUrl { get; set; } = string.Empty;
        public List<string> Books { get; set; } = [];
        public int Price { get; set; }
    }
}
