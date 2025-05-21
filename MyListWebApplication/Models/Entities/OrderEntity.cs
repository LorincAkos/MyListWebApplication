using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MyListWebApplication.Models.Entities
{
    public class OrderEntity
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("userId"), BsonRepresentation(BsonType.String)]
        public string UserId { get; set; } = string.Empty;

        [BsonElement("address"), BsonRepresentation(BsonType.String)]
        public string Address { get; set; } = string.Empty;

        [BsonElement("items")]
        public List<OrderItem> Items { get; set; } = [];


        [BsonElement("totalPrice"), BsonRepresentation(BsonType.Int32)]
        public int TotalPrice { get; set; }

        [BsonElement("date")]
        public DateTime Date { get; set; } = DateTime.Now;
    }

    public class OrderItem
    {
        public string ProductId { get; set; } = string.Empty;
        public string ProductName { get; set; } = string.Empty;
        public int Count { get; set; }
        public int Price {  get; set; }
    }
}
