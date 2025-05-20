using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MyListWebApplication.Models.Enums;

namespace MyListWebApplication.Models.Entities
{
    public class MangaEntity
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("title"), BsonRepresentation(BsonType.String)]
        public string Title { get; set; } = string.Empty;

        [BsonElement("imgUrl"), BsonRepresentation(BsonType.String)]
        public string ImgUrl { get; set; } = string.Empty;

        [BsonElement("description"), BsonRepresentation(BsonType.String)]
        public string Description { get; set; } = string.Empty;

        [BsonElement("start"), BsonRepresentation(BsonType.DateTime)]
        public DateTime StartDate { get; set; }

        [BsonElement("end"), BsonRepresentation(BsonType.DateTime)]
        public DateTime? EndDate { get; set; }

        [BsonElement("score"), BsonRepresentation(BsonType.Double)]
        public double Score { get; set; }

        [BsonElement("status"), BsonRepresentation(BsonType.Int32)]
        public StatusType Status { get; set; }

        [BsonElement("volume"), BsonRepresentation(BsonType.Int32)]
        public StatusType Volume { get; set; }

        [BsonElement("chapter"), BsonRepresentation(BsonType.Int32)]
        public StatusType Chapter { get; set; }

        [BsonElement("author"), BsonRepresentation(BsonType.String)]
        public string Author { get; set; } = string.Empty;

        [BsonElement("rating"), BsonRepresentation(BsonType.Int32)]
        public int Rating { get; set; }

        [BsonElement("adaptation"), BsonRepresentation(BsonType.String)]
        public string Adaptation { get; set; } = string.Empty;

        [BsonElement("genre")]
        public List<GenreType> Genre { get; set; } = [];
    }
}
