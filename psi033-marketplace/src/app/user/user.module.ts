import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../user.service';

import { SignUpComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { LogoutComponent } from '../logout/logout.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EditProfileModalComponent } from '../editprofilemodal/editprofilemodal.component';
import { GameModule } from '../game/game.module';
import { CartComponent } from '../cart/cart.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { WishlistComponent } from '../wishlist/wishlist.component';

@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    LogoutComponent,
    UserDashboardComponent,
    UserProfileComponent,
    SearchResultsComponent,
    SidebarComponent,
    EditProfileModalComponent,
    CartComponent,
    WishlistComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GameModule,
  ],
  providers: [
    UserService
  ],
})
export class UserModule { }
