using Microsoft.AspNetCore.SignalR;
using PetPals_API.HubModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace PetPals_API.HubConfig;

public partial class SuperHub
{
    public async Task getOnlineUsers()
    {

        // Context == Hub.Context
        Guid currUserId = _context.Connection
            .Where(c => c.SignalRid == Context.ConnectionId)
            .Select(c => c.PersonId)
            .SingleOrDefault();

        List<User> onlineUsers = _context.Connection
            .Where(c => c.PersonId != currUserId)
            .Select(c =>
                new User(c.PersonId, _context.Person
                    .Where(p => p.Id == c.PersonId)
                    .Select(p => p.UserName)
                    .SingleOrDefault(), c.SignalRid))
            .ToList();
        
        await Clients.Caller.SendAsync
            ("getOnlineUsersResponse", onlineUsers);



    }
}