import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../user.service';

import { SignUpComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { LogoutComponent } from '../logout/logout.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    LogoutComponent,
    UserDashboardComponent,
    UserProfileComponent,
    NavbarComponent,
    EditProfileComponent,
    SearchbarComponent,
    SearchResultsComponent,
    SidebarComponent
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
