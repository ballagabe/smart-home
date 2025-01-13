using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using SmartHome.Server.Model;
using SmartHome.Server.Extensions;

namespace SmartHome.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers(config =>
            {
                var globalAuthorizationPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                config.Filters.Add(new AuthorizeFilter(globalAuthorizationPolicy));
            });

            var config = new Config();
            builder.Configuration.Bind(config);
            builder.Services.AddSingleton(config);

            builder.Services.ConfigureCors();
            builder.Services.ConfigureAuthentication(config);
            builder.Services.ConfigureSession();
            builder.Services.ConfigureSwagger();
            builder.Services.ConfigureAppServices();

            var app = builder.Build();

            app.UseSession();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors("AllowFrontendDev");
            }

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}