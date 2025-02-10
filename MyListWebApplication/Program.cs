using MyListWebApplication.Data;
using MyListWebApplication.Profiles;
using MyListWebApplication.Repositories;
using MyListWebApplication.Repositories.Interfaces;
using MyListWebApplication.Services;
using MyListWebApplication.Services.Interfaces;

namespace MyListWebApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddSingleton<MongoDbService>();

            builder.Services.AddTransient<IAnimeRepository, AnimeRepository>();

            builder.Services.AddTransient<IAnimeService, AnimeService>();

            builder.Services.AddAutoMapper(typeof(AnimeProfile));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
