namespace PetPals_API.ViewModels;

public class AnimalVm
{
    public int AnimalId { get; set; }
    public string? AnimalName { get; set; }
    public int Price { get; set; }
    public double StarRating { get; set; }
    public string? Description { get; set; }
    public string? Category { get; set; }
    public string? ImageUrl { get; set; }
}