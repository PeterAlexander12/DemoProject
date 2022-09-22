import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AnimalDetailComponent } from './animals/animal-detail.component';
import { AnimalListComponent } from './animals/animal-list.component';

import { AppComponent } from './app.component';
import { LandingComponent } from './home/landing.component';
import { StarComponent } from './shared/star.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [ // COMPONENTS BELONGING TO THIS MODULE
    AppComponent,
    AnimalListComponent,
    StarComponent,
    AnimalDetailComponent,
    LandingComponent,
    AuthComponent
  ],
  imports: [  // THE MODULES TO IMPORT TO THIS MODULE
    BrowserModule, // Exposes NgIf, NgFor
    FormsModule,   // Enables [(ngModel)]
    HttpClientModule,
    
    AppRoutingModule
  ],
  bootstrap: [AppComponent] // STARTUP COMPONENT
})
export class AppModule { }
