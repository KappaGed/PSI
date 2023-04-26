import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  username: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // get user information from service
    const user = this.authService.getCurrentUser();
    if (user) {
      this.username = user.username;
    }
  }

}
