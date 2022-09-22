﻿using Microsoft.AspNetCore.SignalR;
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
            await Clients.Caller.SendAsync("authMeResponseSuccess", tempPerson);
        }

        else //if credentials are incorrect
        {
            await Clients.Caller.SendAsync("authMeResponseFail");
        }
    }

    public async Task askServer(string textFromClient)
    {
        var tempString = textFromClient == "hey" ? "message was 'hey'" 
            : "message was something else";

        /*
         * every client gets a unique connectionId
         */

        // Send to one client:
        await Clients.Client(Context.ConnectionId)
            .SendAsync("askServerResponse", tempString);

        // Send to multiple, with different connectionIds:
        await Clients.Clients(Context.ConnectionId, Context.ConnectionId)
            .SendAsync("askServerResponse", tempString);

        // Send to all clients:
        await Clients.All.SendAsync("askServerResponse", tempString);
    }

}