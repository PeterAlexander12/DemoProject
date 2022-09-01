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

@NgModule({
  declarations: [ // COMPONENTS BELONGING TO THIS MODULE
    AppComponent,
    AnimalListComponent,
    StarComponent,
    AnimalDetailComponent,
    LandingComponent
  ],
  imports: [  // THE MODULES TO IMPORT TO THIS MODULE
    BrowserModule, // Exposes NgIf, NgFor
    FormsModule,   // Enables [(ngModel)]
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'animals', component: AnimalListComponent},
      { path: 'animals/:id', component: AnimalDetailComponent},
      { path: 'landing', component: LandingComponent},
      { path: '', redirectTo: 'landing', pathMatch: 'full'},
      { path: '**', redirectTo: 'landing', pathMatch: 'full'},


      


    ])
  ],
  bootstrap: [AppComponent] // STARTUP COMPONENT
})
export class AppModule { }
