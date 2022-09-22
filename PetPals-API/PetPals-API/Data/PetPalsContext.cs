using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PetPals_API.Models;

namespace PetPals_API.Data;

public class PetPalsContext : DbContext
{
    public DbSet<Animal> Animal => Set<Animal>();
    public DbSet<Person> Person => Set<Person>();
    public DbSet<Connection> Connection => Set<Connection>();

    public PetPalsContext(DbContextOptions options) : base(options)
    {
        
    }

}