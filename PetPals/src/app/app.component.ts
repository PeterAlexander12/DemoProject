import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { SignalrService } from "./signalr.service";

@Component({
  selector: 'pp-root',   // pp-prefix for PetPals
  template: 
  `
  <nav class='navbar navbar-expand navbar-light bg-light'>
  <a class=''navbar brand >{{pageTitle | uppercase}}</a>
  <ul class='nav nav-pills'>
    <li><a class='nav-link' routerLink='/home'>Chat</a></li>
    <li><a class='nav-link' routerLink='/animals'>Animal List</a></li>
    <li><a class='nav-link' routerLink='/auth'>Logga in </a></li>

  </ul>
  </nav>
  <div class='container'>
  <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  pageTitle: string = 'PetPals';


  constructor(
    public signalRService: SignalrService, 
    public authService: AuthService){}

  ngOnInit(): void {
    this.signalRService.startConnection();

    // Wait to make sure connection has time to start
    
    // // setTimeout(() => {
    // //   this.signalRService.serverTestListener();
    // //   this.signalRService.serverTest();
    // // }, 2000);  
  }

  ngOnDestroy(): void {
      this.signalRService.hubConnection?.off("serverTestListener");
  }


}