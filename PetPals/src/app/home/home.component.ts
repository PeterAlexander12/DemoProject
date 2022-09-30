import { Component, OnInit } from '@angular/core';
import { SignalrService, User } from '../signalr.service';
import {Router} from "@angular/router"

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public signalrService: SignalrService,
    public router: Router) { }

   
   users: Array<User> = new Array<User>();

   ngOnInit(): void {
     this.userOnListener();
     this.userOffListener();
     this.logOutListener();
     this.getOnlineUsersListener();
 
     //hubConnection.state is 1 when hub connection is connected.
     if (this.signalrService.hubConnection?.state == 1) this.getOnlineUsersInvoke();
     else {
       this.signalrService.ssSubj.subscribe((obj: any) => {
         if (obj.type == "HubConnStarted") {
           this.getOnlineUsersInvoke();
         }
       });
     }
   }
 
 
   
   logOut(): void {
    if(localStorage.getItem("personId") != null){
      this.signalrService.hubConnection?.invoke("logOut", this.signalrService.userData?.id)
      .catch(err => console.error(err));
    }
    this.router.navigate(['animals']);
   }


   logOutListener(): void {
     this.signalrService.hubConnection?.on("logoutResponse", () => {
      localStorage.removeItem("personId");
      console.log(`User "${this.signalrService.userData?.name}" logged out`);
      location.reload();
       // this.signalrService.hubConnection.stop();
     });
   }
 
 
 
   
   userOnListener(): void {
     this.signalrService.hubConnection?.on("userOn", (newUser: User) => {
       console.log(newUser);
       this.users.push(newUser);
     });
   }
   userOffListener(): void {
     this.signalrService.hubConnection?.on("userOff", (personId: string) => {
       this.users = this.users.filter(u => u.id != personId);
     });
   }
 
 
 
   getOnlineUsersInvoke(): void {
     this.signalrService.hubConnection?.invoke("getOnlineUsers")
     .catch(err => console.error(err));
   }
   getOnlineUsersListener(): void {
     this.signalrService.hubConnection?.on("getOnlineUsersResponse", 
     (onlineUsers: Array<User>) => {
       this.users = [...onlineUsers];
     });
   }
}
