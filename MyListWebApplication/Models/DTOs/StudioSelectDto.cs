using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MyListWebApplication.Models.DTOs
{
    public class StudioSelectDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
    }
}
