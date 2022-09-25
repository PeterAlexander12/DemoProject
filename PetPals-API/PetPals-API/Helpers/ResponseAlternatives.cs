namespace PetPals_API.Helpers;

public class ResponseAlternatives
{

    Random rnd = new();

    public string GenerateRandomResponse()
    {
        var responseAlternative = rnd.Next(1, 4);

        var textFromClient = "";

        var tempString = responseAlternative switch
        {
            1 => $"{textFromClient} Response A",
            2 => $"{textFromClient} Response B",
            _ => $"{textFromClient} Response C"
        };

        return tempString;

    }
}