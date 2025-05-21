using MyListWebApplication.Data;
using MyListWebApplication.Profiles;
using MyListWebApplication.Repositories;
using MyListWebApplication.Repositories.Interfaces;
using MyListWebApplication.Services;
using MyListWebApplication.Services.Interfaces;
using Microsoft.AspNetCore.Http.Json;
using System.Text.Json.Serialization;
using Microsoft.IdentityModel.Tokens;
using System.Text;


namespace MyListWebApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular",
                    policy => policy.WithOrigins("http://localhost:4200")
                                    .AllowAnyMethod()  
                                    .AllowAnyHeader()  
                                    .AllowCredentials()); 
            });
            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.Configure<JsonOptions>(options =>
            {
                options.SerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
            });


            builder.Services.AddSingleton<MongoDbService>();

            builder.Services.AddTransient<IAnimeRepository, AnimeRepository>();
            builder.Services.AddTransient<IMangaRepository, MangaRepository>();
            builder.Services.AddTransient<IStorageRepository, StorageRepository>();
            builder.Services.AddTransient<IBundleRepository, BundleRepository>();
            builder.Services.AddTransient<IStudioRepository, StudioRepository>();
            builder.Services.AddTransient<IUserRepository, UserRepository>();

            builder.Services.AddTransient<IAnimeService, AnimeService>();
            builder.Services.AddTransient<IMangaService, MangaService>();
            builder.Services.AddTransient<IStorageService, StorageService>();
            builder.Services.AddTransient<IBundleService, BundleService>();
            builder.Services.AddTransient<IStudioService, StudioService>();
            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.AddScoped<OrderService>();


            builder.Services.AddAutoMapper(typeof(AnimeProfile));
            builder.Services.AddAutoMapper(typeof(AnimeSelectProfile));
            builder.Services.AddAutoMapper(typeof(MangaProfile));
            builder.Services.AddAutoMapper(typeof(MangaSelectProfile));
            builder.Services.AddAutoMapper(typeof(StorageProfile));
            builder.Services.AddAutoMapper(typeof(BundleProfile));
            builder.Services.AddAutoMapper(typeof(StudioProfile));
            builder.Services.AddAutoMapper(typeof(StudioSelectProfile));
            builder.Services.AddAutoMapper(typeof(UserProfile));

            // JWT Authentication
            builder.Services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", options =>
                {
                    var key = builder.Configuration["Jwt:Key"];
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
                    };
                });

            var app = builder.Build();

            app.UseCors("AllowAngular");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
