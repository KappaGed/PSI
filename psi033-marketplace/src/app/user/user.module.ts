import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../user.service';

import { SignUpComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { LogoutComponent } from '../logout/logout.component';


@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    LogoutComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
