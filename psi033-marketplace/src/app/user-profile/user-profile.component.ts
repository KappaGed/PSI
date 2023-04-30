import { Component } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user! : User | null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe(user => {
      console.log(user)
      this.user = user;
    });
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
