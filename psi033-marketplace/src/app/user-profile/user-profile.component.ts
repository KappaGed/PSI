import { Component } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user! : User | null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe(user => {
      console.log(user)
      this.user = user;
    });
  }

}
