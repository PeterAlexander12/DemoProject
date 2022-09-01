import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AnimalListComponent } from './animals/animal-list.component';

import { AppComponent } from './app.component';
import { StarComponent } from './shared/star.component';

@NgModule({
  declarations: [ // COMPONENTS BELONGING TO THIS MODULE
    AppComponent,
    AnimalListComponent,
    StarComponent
  ],
  imports: [  // THE MODULES TO IMPORT TO THIS MODULE
    BrowserModule, // Exposes NgIf, NgFor
    FormsModule   // Enables [(ngModel)]

  ],
  bootstrap: [AppComponent] // STARTUP COMPONENT
})
export class AppModule { }
