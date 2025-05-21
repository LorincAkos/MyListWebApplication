using MongoDB.Driver;
using MyListWebApplication.Data;
using MyListWebApplication.Models.Entities;

namespace MyListWebApplication.Services
{
    public class OrderService(MongoDbService db)
    {
        private readonly IMongoCollection<OrderEntity> _orders = db.Database.GetCollection<OrderEntity>("Orders");


        public void CreateOrder(OrderEntity order)
        {
             _orders.InsertOne(order);
        }

        public List<OrderEntity> GetOrdersByUserId(string userId)
        {
            return  _orders.Find(o => o.UserId == userId).ToList();
        }
    }
}
