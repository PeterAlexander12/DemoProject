import { Component } from "@angular/core";

@Component({
  selector: 'pp-root',   // pp-prefix for PetPals
  template: 
  `
  <nav class='navbar navbar-expand navbar-light bg-light'>
  <a class=''navbar brand >{{pageTitle}}</a>
  <ul class='nav nav-pills'>
    <li><a class='nav-link' routerLink='/landing'>Home</a></li>
    <li><a class='nav-link' routerLink='/animals'>Animal List</a></li>
  </ul>
  </nav>
  <div class='container'>
  <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent{
  pageTitle: string = 'PetPals';
}