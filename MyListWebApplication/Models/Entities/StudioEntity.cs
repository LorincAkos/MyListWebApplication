using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MyListWebApplication.Models.Entities
{
    public class StudioEntity
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("name"), BsonRepresentation(BsonType.String)]
        public string Name { get; set; } = string.Empty;

        [BsonElement("imgUrl"), BsonRepresentation(BsonType.String)]
        public string ImgUrl { get; set; } = string.Empty;

        [BsonElement("established"), BsonRepresentation(BsonType.DateTime)]
        public DateOnly Established { get; set; }

        [BsonElement("studio_info"), BsonRepresentation(BsonType.String)]
        public string StudioInfo { get; set; } = string.Empty;

        [BsonElement("anime")]
        public List<string> Anime { get; set; } = [];
    }
}
