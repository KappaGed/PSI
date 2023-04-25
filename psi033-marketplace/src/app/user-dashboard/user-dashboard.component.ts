import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  username: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    // get user information from service
    const user = this.userService.getCurrentUser();
    if (user) {
      this.username = user.username;
    }
  }

}
