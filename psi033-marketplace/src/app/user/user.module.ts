import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../user.service';
import { SignUpComponent } from '../signup/signup.component';


@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
