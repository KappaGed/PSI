import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LoginSignupGuard } from './login-signup.guard';
import { LogoutComponent } from './logout/logout.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { GamesComponent } from './games/games.component';
import { GameDetailComponent } from './game-detail/game-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: SignUpComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'logout', component: LogoutComponent, },
  { path: 'dashboard', component: UserDashboardComponent, },
  { path: 'profile/:username', component: UserProfileComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'games', component: GamesComponent },
  { path: 'games/:id', component: GameDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
