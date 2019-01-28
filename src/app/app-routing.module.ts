import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'core', loadChildren: './core/core.module#CoreModule'},
  {path: 'landing', loadChildren: './landing/landing.module#LandingModule'},
  {path:'', redirectTo:'landing', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
