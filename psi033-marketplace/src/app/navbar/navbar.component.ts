import { Component } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user!: User | null;

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe(user => {
      console.log(user)
      this.user = user;
    });
  }

  redirectToProfile() {
    if (this.user) {
      this.router.navigate(['profile', this.user.username]);
    }
  }

  logout() {
    this.authService.logout();
  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
