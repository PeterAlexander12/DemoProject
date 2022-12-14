import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignalrService, User } from '../signalr.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public signalrService: SignalrService, public router: Router) {
    let tempPersonId = localStorage.getItem('personId');
    if (tempPersonId) {
      if (this.signalrService.hubConnection?.state == 1) {
        //if already connected
        this.reauthMeListener();
        this.reauthMe(tempPersonId);
      } else {
        this.signalrService.ssObs().subscribe((obj: any) => {
          if (obj.type == 'HubConnStarted') {
            this.reauthMeListener();
            if(tempPersonId != null){
              this.reauthMe(tempPersonId);
            }
          }
        });
      }
    }
  }

  public isAuthenticated: boolean = false;

  //  CALL BACKEND-HUB (AuthMe)
  async authMe(user: string, pass: string) {
    let personInfo = { userName: user, password: pass };

    await this.signalrService.hubConnection?.invoke('AuthMe', personInfo)
      .then(() => {
        this.signalrService.toastr.info('Loggar in...');
      })
      .catch((err) => console.error(err));
  }

  // WHEN HUB REPLIES with userId, STORE ID IN LOCALSTORAGE
  public authMeListenerSuccess() {
    this.signalrService.hubConnection?.on('authMeResponseSuccess',(user: User) => {
        console.log(`user "${user.name}" logged in`);
        console.log(`user id: ${user.id}`);

        this.signalrService.userData = {...user};

        localStorage.setItem("personId", JSON.stringify(user.id) )
        this.isAuthenticated = true;
        this.signalrService.toastr.success('Inloggning lyckades');
        this.signalrService.router.navigateByUrl('/home');
      }
    );
  }

  public authMeListenerFail() {
    this.signalrService.hubConnection?.on('userAlreadyLoggedIn', () => {
      this.signalrService.toastr.error('Du är redan inloggad!');
    });
  }
  public authMeListenerDoubleLogIn() {
    this.signalrService.hubConnection?.on('authMeResponseFail', () => {
      this.signalrService.toastr.error('Inloggning misslyckades');
    });
  }

  async reauthMe(personId: string) {
    await this.signalrService.hubConnection?.invoke('ReauthMe', personId)
      .then(() => this.signalrService.toastr.info('Verifierar inloggning...'))
      .catch((err) => console.error(err));
  }

  reauthMeListener() {
    this.signalrService.hubConnection?.on('reauthMeResponse',
      (user: User) => {
        console.log(`user: ${user} `);
        this.signalrService.userData = {...user};
        console.log(`signalrService.userData.name: ${this.signalrService.userData.name} `);
        this.isAuthenticated = true;
        this.signalrService.toastr.success('Du är inloggad');
        if (this.signalrService.router.url == '/auth')
          this.signalrService.router.navigateByUrl('/home');
      }
    );
  }
}
