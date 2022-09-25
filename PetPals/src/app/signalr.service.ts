import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as signalR from '@aspnet/signalr';

@Injectable({  providedIn: 'root'})
export class SignalrService {

  constructor(public toastr: ToastrService, public router: Router) { }
  
  // KOPPLINGEN TILL BACKEND
  hubConnection?:signalR.HubConnection;

  personName: string | undefined;


  // CALL THIS FIRST, FROM APP COMPONENT
  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7133/HubOne', {
        skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets
    }).build();
    
      this.hubConnection
      .start()
      .then(() => {
          this.serverTestListener();
          this.serverTest();
        
      }).catch(err => console.log('Error while starting connection: ' + err))
  }



  // Three important methods on hubconnection: <.invoke> <.on> <.off>

  // INVOKE: (Scheduling for future execution..)
  async serverTest() {
    console.log("serverTest called");
    let message = "Hello from Client!"
    await this.hubConnection?.invoke("ServerTest", message)
      .then(() => {console.log('serverTest.then');})
      .catch(err => console.error(err))
  }

  // LISTENING FOR RESPONSE FROM SERVER
   /** Registers a handler that will be invoked when the hub method with the specified method name is invoked.
     * @param {string} methodName The name of the hub method to define.
     * @param {Function} newMethod The handler that will be raised when the hub method is invoked.
     */
  serverTestListener() {
    console.log("serverTestListener called")

    this.hubConnection?.on("ServerTestRepeat", (textFromServer) => {
      console.log(textFromServer)
      this.toastr.success(textFromServer);
    });

    this.hubConnection?.on("ServerTestResponse", (textFromServer) => {
      console.log(textFromServer)
      this.toastr.success(textFromServer);
    });
  }

}





