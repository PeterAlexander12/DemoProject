import { Component } from "@angular/core";

@Component({
  selector: 'pp-root',   // pp-prefix for PetPals
  template: `
  <div>
    <h1>{{pageTitle}}</h1>
    <pp-animals></pp-animals>
  </div>`
})
export class AppComponent{
  pageTitle: string = 'PetPals';
}