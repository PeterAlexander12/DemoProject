import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as signalR from '@aspnet/signalr';

@Injectable({  providedIn: 'root'})
export class SignalrService {

  constructor(public toastr: ToastrService, public router: Router) { }
  
  hubConnection?:signalR.HubConnection;

  personName: string | undefined;

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7133/HubOne', {
        skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets
    }).build();
    
      this.hubConnection
      .start()
      .then(() => {
          console.log('hubConnectionStart');
          this.askServerListener();
          this.askServer();
      }).catch(err => console.log('Error while starting connection: ' + err))
  }



  // Three important methods on hubconnection: <.invoke> <.on> <.off>

  // invoke a function onto the server called 'askServer'
  // 'askServer' is in the hub (backend project)
  // Pass argument 'hey' (string)
  async askServer() {
    console.log('askServerStart');
    
    await this.hubConnection?.invoke("askServer", "hi")
      .then(() => {console.log('askServer.then');})
      .catch(err => console.error(err))

      console.log("This is the final prompt");
  }

  askServerListener() {
    console.log('askServerListenerStart');

    this.hubConnection?.on("askServerResponse",(someText) => {
    console.log('askServer.listener');
      this.toastr.success(someText);
    })
  }


}
