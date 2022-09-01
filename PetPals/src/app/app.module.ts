import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [ // COMPONENTS BELONGING TO THIS MODULE
    AppComponent
  ],
  imports: [  // THE MODULES TO IMPORT TO THIS MODULE
    BrowserModule
  ],
  bootstrap: [AppComponent] // STARTUP COMPONENT
})
export class AppModule { }
