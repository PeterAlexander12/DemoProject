import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignalrService } from '../signalr.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public signalrService: SignalrService, public router: Router) {
    let tempPersonId = localStorage.getItem('personId');
    if (tempPersonId) {
      if (this.signalrService.hubConnection?.on) {
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
    this.signalrService.hubConnection?.on('authMeResponseSuccess',
      (id: any) => {
        console.log(`User Id: ${id}`);
        localStorage.setItem("personId", id)
        this.isAuthenticated = true;
        this.signalrService.toastr.success('Inloggning lyckades');
        this.signalrService.router.navigateByUrl('/landing');
      }
    );
  }

  public authMeListenerFail() {
    this.signalrService.hubConnection?.on('authMeResponseFail', () => {
      this.signalrService.toastr.error('Inloggning misslyckades');
    });
  }

  async reauthMe(personId: string) {
    await this.signalrService.hubConnection?.invoke('reauthMe', personId)
      .then(() => this.signalrService.toastr.info('Verifierar inloggning...'))
      .catch((err) => console.error(err));
  }

  reauthMeListener() {
    this.signalrService.hubConnection?.on(
      'reauthMeResponse',
      (personId: string, userName: string) => {
        console.log(`User Id: ${personId}`);
        console.log(`userName: ${userName}`);

        this.signalrService.userName = userName;
        this.isAuthenticated = true;
        this.signalrService.toastr.success('Du är inloggad');
        if (this.signalrService.router.url == '/auth')
          this.signalrService.router.navigateByUrl('/home');
      }
    );
  }
}
