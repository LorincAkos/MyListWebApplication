using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyListWebApplication.Models.Entities
{
    public class AnimeEntity
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("title"), BsonRepresentation(BsonType.String)]
        public string Title { get; set; } = string.Empty;

        [BsonElement("score"), BsonRepresentation(BsonType.Double)]
        public double Score { get; set; }

        [BsonElement("episode"), BsonRepresentation(BsonType.Int32)]
        public int Episode { get; set; }

        [BsonElement("finished"), BsonRepresentation(BsonType.Boolean)]
        public bool IsFinished { get; set; }
    }
}
