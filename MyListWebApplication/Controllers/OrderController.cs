using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyListWebApplication.Models.Entities;
using MyListWebApplication.Services;
using System.Security.Claims;

namespace MyListWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController(OrderService orderService) : ControllerBase
    {
        private readonly OrderService _orderService = orderService;

        [HttpPost]
        [Authorize]
        public IActionResult PlaceOrder([FromBody] OrderEntity order)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                Console.WriteLine(userId);
                return Unauthorized();
            }
            order.UserId = userId;

             _orderService.CreateOrder(order);
            return Ok(new { message = "Order placed successfully." });
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetMyOrders()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var orders =  _orderService.GetOrdersByUserId(userId);
            return Ok(orders);
        }
    }
}
