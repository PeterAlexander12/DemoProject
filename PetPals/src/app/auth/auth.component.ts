import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignalrService } from '../signalr.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'pm-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  constructor(public signalrService: SignalrService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authMeListenerSuccess();
    this.authService.authMeListenerFail();
  }

  ngOnDestroy(): void {
    this.signalrService.hubConnection?.off("authMeResponseSuccess");
    this.signalrService.hubConnection?.off("authMeResponseFail");
  }

  // LOGIN FORM
  onSubmit(form: NgForm) {
    if(!form.valid) { return; }
    this.authService.authMe(form.value.userName, form.value.password);
    form.reset();
  }





}
