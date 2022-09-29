using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using PetPals_API.Data;
using PetPals_API.DTO;
using PetPals_API.Models;

namespace PetPals_API.HubConfig;

public class SuperHub : Hub
{
    readonly PetPalsContext _context;

    public SuperHub(PetPalsContext context)
    {
        _context = context;
    }

    public async Task reauthMe(Guid personId)
    {
        string currSignalrID = Context.ConnectionId;
        Person tempPerson = _context.Person.SingleOrDefault(p => p.Id == personId);

        if (tempPerson != null) //if credentials are correct
        {
            Console.WriteLine("\n" + tempPerson.UserName + " logged in" + "\nSignalrID: " + currSignalrID);

            Connection currUser = new Connection
            {
                Id = Guid.NewGuid(),
                PersonId = tempPerson.Id,
                SignalRid = currSignalrID,
                TimeStamp = DateTime.Now
            };

            await _context.Connection.AddAsync(currUser);
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }


            await Clients.Caller.SendAsync("reauthMeResponse", tempPerson.Id, tempPerson.UserName);
        }
    } 

    public async Task AuthMe(LoginDTO login)
    {
        var currentSignalrId = Context.ConnectionId;

        var tempPerson = _context.Person
            .SingleOrDefault(p => p.UserName == login.UserName 
                                  && p.Password == login.PassWord);

        if (tempPerson != null) //if credentials are correct
        {
            Console.WriteLine("\n" + tempPerson.UserName + " logged in" 
                              + "\nSignalrID: " + currentSignalrId);

            var currUser = new Connection
            {
                Id = Guid.NewGuid(),
                PersonId = tempPerson.Id,
                SignalRid = currentSignalrId,
                TimeStamp = DateTime.Now
            };

            await _context.Connection.AddAsync(currUser);
            try { await _context.SaveChangesAsync(); }
            catch (Exception e) { Console.WriteLine(e); throw; }
            await Clients.Caller.SendAsync("authMeResponseSuccess", tempPerson.Id);
        }

        else //if credentials are incorrect
        {
            await Clients.Caller.SendAsync("authMeResponseFail");
        }
    }

    public async Task ServerTest(string textFromClient) 
    {
        
        var reply = "Hello from Server!";
        
        /*
         * every client gets a unique connectionId
         */

        /*
         *  Send to one client:
         */

        await Clients.Client(Context.ConnectionId)
            .SendAsync("ServerTestRepeat", textFromClient);

        await Clients.Client(Context.ConnectionId)
            .SendAsync("ServerTestResponse", reply);

        /*
         *  Send to multiple, with different connectionIds:
         */

        //await Clients.Clients(Context.ConnectionId, Context.ConnectionId)
        //    .SendAsync("ServerTestResponse", tempString);

        /*
         *  Send to all clients:
         */

        //await Clients.All.SendAsync("ServerTestResponse", tempString);
    }

}