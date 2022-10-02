using System.Text.RegularExpressions;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using PetPals_API.Data;
using PetPals_API.DTO;
using PetPals_API.HubModels;
using PetPals_API.Models;

namespace PetPals_API.HubConfig;

public partial class SuperHub : Hub
{
    readonly PetPalsContext _context;

    public SuperHub(PetPalsContext context)
    {
        _context = context;
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var currUserId = _context.Connection
            .Where(c => c.SignalRid == Context.ConnectionId)
            .Select(c => c.PersonId)
            .FirstOrDefault();

        // Remove all connections with this user
        _context.Connection.RemoveRange(_context.Connection
            .Where(p => p.PersonId == currUserId)
            .ToList());

        try
        {
            _context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        Clients.Others.SendAsync("userOff", currUserId);

        return base.OnDisconnectedAsync(exception);
    }

    public async Task ReauthMe(string? userId)
    {
        var personId = ConvertStringToGuid(userId);
        var currSignalrID = Context.ConnectionId;
        Person? tempPerson;

        try
        {
            tempPerson = _context.Person.SingleOrDefault(p => p.Id == personId);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        if (tempPerson != null) //if credentials are correct
        {
            var currUser = new Connection
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

            var newUser = new User(tempPerson.Id, tempPerson.UserName,
                currSignalrID);

            await Clients.Caller.SendAsync("reauthMeResponse", newUser);
            await Clients.Others.SendAsync("userOn", newUser);
        }
    }

    public async Task AuthMe(LoginDTO login)
    {
        var currentSignalrId = Context.ConnectionId;

        var tempPerson = _context.Person.SingleOrDefault(p =>
            p.UserName == login.UserName && p.Password == login.PassWord);

        if (tempPerson != null) //if credentials are correct
        {
            if (await UserIsLoggedIn(currentSignalrId, tempPerson.UserName))
            {
                await Clients.Caller.SendAsync("userAlreadyLoggedIn");
                return;
            }

            var currUser = new Connection
            {
                Id = Guid.NewGuid(),
                PersonId = tempPerson.Id,
                SignalRid = currentSignalrId,
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

            var newUser = new User(tempPerson.Id, tempPerson.UserName,
                currentSignalrId);
            await Clients.Caller.SendAsync("authMeResponseSuccess", newUser);
            await Clients.Others.SendAsync("userOn", newUser);
        }

        else //if credentials are incorrect
            await Clients.Caller.SendAsync("authMeResponseFail");
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

    public void LogOut(string? userId)
    {
        if (userId != null)
        {
            var personId = ConvertStringToGuid(userId);
            _context.Connection.RemoveRange(_context.Connection
                .Where(p => p.PersonId == personId)
                .ToList());

            _context.SaveChanges();
            Clients.Caller.SendAsync("logoutResponse");
            Clients.Others.SendAsync("userOff", personId);
        }
        else
        {
            Console.WriteLine("Already logged out");
            //throw new ArgumentNullException(userId);
        }
    }

    public async Task<bool> UserIsLoggedIn(string signalrId, string? userName)
    {
        var tempPerson =
            _context.Person.SingleOrDefault(p => p.UserName == userName);

        var isLoggedIn = await _context.Connection.AnyAsync(c =>
            tempPerson != null && c.PersonId == tempPerson.Id);

        return isLoggedIn;
    }

    public Guid ConvertStringToGuid(string? input)
    {
        var pattern =
            @"(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}";
        var rg = new Regex(pattern);
        var guid = rg.Match(input);
        return Guid.Parse(guid.Value);
    }
}