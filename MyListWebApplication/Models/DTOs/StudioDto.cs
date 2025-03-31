using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MyListWebApplication.Models.DTOs
{
    public class StudioDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string ImgUrl { get; set; } = string.Empty;
        public DateOnly Established { get; set; }
        public string StudioInfo { get; set; } = string.Empty;
        public List<string> Anime { get; set; } = [];
    }
}
