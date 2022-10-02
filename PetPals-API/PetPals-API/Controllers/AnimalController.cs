using Microsoft.AspNetCore.Mvc;
using PetPals_API.Repository;
using PetPals_API.ViewModels;

namespace PetPals_API.Controllers;

[ApiController] [Route("[controller]")]
public class AnimalController : ControllerBase
{
    readonly ILogger<AnimalController> _logger;
    readonly AnimalRepository _repository;

    public AnimalController(ILogger<AnimalController> logger,
        AnimalRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }

    [HttpGet("list")] public ActionResult<IEnumerable<AnimalVm>> ListAnimals()
    {
        return Ok(_repository.GetAllAnimals());
    }

    [HttpGet("{id:int}")] public ActionResult<AnimalVm> GetAnimal(int id)
    {
        return Ok(_repository.GetAnimal(id));
    }
}