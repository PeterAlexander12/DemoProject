import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignalrService } from '../signalr.service';

@Component({
  selector: 'pm-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  constructor(public signalrService: SignalrService) { }

  ngOnInit(): void {
    this.authMeListenerSuccess();
    this.authMeListenerFail();
  }

  ngOnDestroy(): void {
    this.signalrService.hubConnection?.off("authMeResponseSuccess");
    this.signalrService.hubConnection?.off("authMeResponseFail");
  }

  onSubmit(form: NgForm) {
    if(!form.valid) { return; }
    this.authMe(form.value.userName, form.value.password);
    form.reset();
  }

  async authMe(user: string, pass: string) {
    let personInfo = {userName: user, password: pass};

    await this.signalrService.hubConnection?.invoke("AuthMe", personInfo)
    .finally(() => {
      this.signalrService.toastr.info("Login attempt...")
    }).catch(err => console.error(err));
  }

  private authMeListenerSuccess() {
    this.signalrService.hubConnection?.on("authMeResponseSuccess", 
    (personInfo: any) => {
      console.log(personInfo);
      this.signalrService.personName = personInfo.name;
      this.signalrService.toastr.success("Login successful!");
      this.signalrService.router.navigateByUrl("/landing");
    });
  }

  private authMeListenerFail() {
    this.signalrService.hubConnection?.on("authMeResponseFail", () => {
      this.signalrService.toastr.error("Wrong credentials!");
    })
  }

}
