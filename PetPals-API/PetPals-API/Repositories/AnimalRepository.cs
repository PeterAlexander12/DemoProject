using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using PetPals_API.ViewModels;

namespace PetPals_API.Repository;

public class AnimalRepository
{
    public AnimalRepository()
    {
    }

    public IEnumerable<AnimalVm> GetAllAnimals()
    {
        var animal1 = new AnimalVm
            {
                AnimalId = 1,
                AnimalName = "Anna",
                Price = 240,
                StarRating = 4.3,
                Description = "This is a short description. " +
                              "Lorem ipsum dolor sit amet, " +
                              "consectetur adipiscing elit.",
                Category = "Dog",
                ImageUrl = "./assets/images/AnnaDog.jpg"
            };
        var animal2 = new AnimalVm
        {
            AnimalId = 2,
            AnimalName = "Bert",
            Price = 6499,
            StarRating = 3.5,
            Description = "This is a short description. " +
                          "Lorem ipsum dolor sit amet, " +
                          "consectetur adipiscing elit.",
            Category = "Cat",
            ImageUrl = "./assets/images/BertCat.jpg"
        };
        var animal3 = new AnimalVm
        {
            AnimalId = 3,
            AnimalName = "Caesar",
            Price = 999,
            StarRating = 3.9,
            Description = "This is a short description. " +
                          "Lorem ipsum dolor sit amet, " +
                          "consectetur adipiscing elit.",
            Category = "Horse",
            ImageUrl = "./assets/images/CaesarHorse.jpg"
        };
        var animal4 = new AnimalVm
        {
            AnimalId = 4,
            AnimalName = "David",
            Price = 50,
            StarRating = 5,
            Description = "This is a short description. " +
                          "Lorem ipsum dolor sit amet, " +
                          "consectetur adipiscing elit.",
            Category = "Hamster",
            ImageUrl = "./assets/images/DavidHamster.jpg"
        };
        var animal5 = new AnimalVm
        {
            AnimalId = 5,
            AnimalName = "Emma",
            Price = 5499,
            StarRating = 4.6,
            Description = "This is a short description. " +
                          "Lorem ipsum dolor sit amet, " +
                          "consectetur adipiscing elit.",
            Category = "Turtle",
            ImageUrl = "./assets/images/EmmaTurtle.jpg"
        };
        
        var animals = new List<AnimalVm>
        {
            animal1, animal2, animal3, animal4, animal5
        };

        return animals;
    }

    public AnimalVm? GetAnimal(int id)
    {
        var animals = GetAllAnimals();
        return animals.FirstOrDefault(a => a.AnimalId == id);

    }
}