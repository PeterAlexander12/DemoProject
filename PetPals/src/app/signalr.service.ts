import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as signalR from '@aspnet/signalr';
import { Observable, Subject } from 'rxjs';

export class User {
  public id: string | undefined;
  public name: string | undefined;
  public signalrId: string | undefined;
  public messages: Array<Message> | undefined;
}

export class Message {
  constructor(
    public content: string, 
    public fromMe: boolean
  ){}
}

@Injectable({  providedIn: 'root'})
export class SignalrService {

  constructor(public toastr: ToastrService, public router: Router) { }
  
  // KOPPLINGEN TILL BACKEND
  hubConnection?:signalR.HubConnection;

  connectionStarted = false;

  userData: User | undefined;

  ////////////////////////////////////////////////////////////////////
  ssSubj = new Subject<any>();
  ssObs(): Observable<any> {
    return this.ssSubj.asObservable();
  }


  // CALL THIS FIRST, FROM APP COMPONENT
  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7133/HubOne', {
        skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets
    }).build();
    
      this.hubConnection
      .start()
      .then(() => {
          this.connectionStarted = true;
          this.ssSubj.next({type: "HubConnStarted"});
        }).catch(err => console.log('Error while starting connection: ' + err))
        console.log('startConnection');
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
   /** Registers a handler that will be invoked when the hub method 
    * with the specified method name is invoked.
   **/
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





