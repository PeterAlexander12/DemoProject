import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AnimalListComponent } from './animals/animal-list.component';
import { AnimalDetailComponent } from './animals/animal-detail.component';
import { LandingComponent } from './home/landing.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
      { path: 'animals', component: AnimalListComponent},
      { path: 'animals/:id', component: AnimalDetailComponent},
      { path: 'landing', component: LandingComponent},
      { path: 'auth', component: AuthComponent},
      { path: '', redirectTo: 'landing', pathMatch: 'full'},
      { path: 'home', loadChildren: () => import('./home/home.module')
      .then(m => m.HomeModule), canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'landing', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
