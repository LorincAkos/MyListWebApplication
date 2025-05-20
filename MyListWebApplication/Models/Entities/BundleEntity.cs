using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MyListWebApplication.Models.Enums;

namespace MyListWebApplication.Models.Entities
{
    public class BundleEntity
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("title"), BsonRepresentation(BsonType.String)]
        public string Title { get; set; } = string.Empty;

        [BsonElement("imgUrl"), BsonRepresentation(BsonType.String)]
        public string ImgUrl { get; set; } = string.Empty;

        [BsonElement("books")]
        public List<string> Books { get; set; } = [];

        [BsonElement("price"), BsonRepresentation(BsonType.Int32)]
        public int Price { get; set; }
    }
}
