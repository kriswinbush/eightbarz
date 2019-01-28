import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MaterialModule } from '../material/material.module';


import { AuthService } from '../auth/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AccountMenuComponent } from './account-menu/account-menu.component';

@NgModule({
  declarations: [LoginComponent, UserProfileComponent, AccountMenuComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService],
  exports: [
    AccountMenuComponent
  ]
})
export class AuthModule { }
