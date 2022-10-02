using Microsoft.EntityFrameworkCore;
using PetPals_API.Data;
using PetPals_API.HubConfig;
using PetPals_API.Repository;

var ClientOrigin = "_clientOrigin";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<PetPalsContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy(ClientOrigin,
        policy =>
        {
            policy.WithOrigins("http://localhost:4200",
                "http://localhost:58018");
        });
});
builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = true;
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<AnimalRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(ClientOrigin);

app.UseAuthorization();
app.MapControllers();
app.MapHub<SuperHub>("/HubOne");

app.Run();