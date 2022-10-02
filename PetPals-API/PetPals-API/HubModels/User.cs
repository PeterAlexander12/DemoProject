namespace PetPals_API.HubModels;

public class User
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? SignalrId { get; set; }

    public User(Guid id, string? name, string? signalrId)
    {
        Id = id;
        Name = name;
        SignalrId = signalrId;
    }
}