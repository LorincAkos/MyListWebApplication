using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MyListWebApplication.Models.Enums;

namespace MyListWebApplication.Models.Entities
{
    public class AnimeEntity
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("premier"), BsonRepresentation(BsonType.String)]
        public string Premier { get; set; } = string.Empty;

        [BsonElement("title"), BsonRepresentation(BsonType.String)]
        public string Title { get; set; } = string.Empty;

        [BsonElement("imgUrl"), BsonRepresentation(BsonType.String)]
        public string ImgUrl { get; set; } = string.Empty;

        [BsonElement("description"), BsonRepresentation(BsonType.String)]
        public string Description { get; set; } = string.Empty;

        [BsonElement("start"), BsonRepresentation(BsonType.DateTime)]
        public DateOnly StartDate { get; set; }

        [BsonElement("end"), BsonRepresentation(BsonType.DateTime)]
        public DateOnly EndDate { get; set; }

        [BsonElement("score"), BsonRepresentation(BsonType.Double)]
        public double Score { get; set; }

        [BsonElement("status"), BsonRepresentation(BsonType.Int32)]
        public StatusType Status { get; set; }

        [BsonElement("episode"), BsonRepresentation(BsonType.Int32)]
        public int Episode { get; set; }

        [BsonElement("duration"), BsonRepresentation(BsonType.Int32)]
        public int Duration { get; set; }

        [BsonElement("studio"), BsonRepresentation(BsonType.String)]
        public string Studio { get; set; } = string.Empty ;

        [BsonElement("rating"), BsonRepresentation(BsonType.Int32)]
        public int Rating { get; set; }

        [BsonElement("prequel"), BsonRepresentation(BsonType.String)]
        public string Prequel { get; set; } = string.Empty;

        [BsonElement("sequel"), BsonRepresentation(BsonType.String)]
        public string Sequel { get; set; } = string.Empty;

        [BsonElement("source"), BsonRepresentation(BsonType.String)]
        public string Source { get; set; } = string.Empty;
    }
}
