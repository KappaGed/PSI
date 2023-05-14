import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private GameService: GameService) { }

  ngOnInit() {
    const userId = localStorage.getItem('loggedInUser');
    if (userId) {
      this.userService.getById(userId).subscribe(user => {
        this.user = user;
        console.log(user);
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
  }

  redirectToProfile() {
    this.router.navigate(['/profile']);
  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
