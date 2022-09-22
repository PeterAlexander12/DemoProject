using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PetPals_API.Models;

public class Connection
{
    public Guid Id { get; set; }
    public Guid PersonId { get; set; }
    public string? SignalRid { get; set; }
    public DateTime TimeStamp { get; set; }
}