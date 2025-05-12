using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MyListWebApplication.Models.Entities
{
    public class UserEntity
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("userName"), BsonRepresentation(BsonType.String)]
        public string UserName { get; set; } = string.Empty;

        [BsonElement("email"), BsonRepresentation(BsonType.String)]
        public string Email { get; set; } = string.Empty;

        [BsonElement("password"), BsonRepresentation(BsonType.String)]
        public string Password { get; set; } = string.Empty;

        [BsonElement("isAdmin"), BsonRepresentation(BsonType.Boolean)]
        public bool IsAdmin { get; set; }

        [BsonElement("finishedAnime")]
        public List<string> FinishedAnime { get; set; } = [];
    }
}
