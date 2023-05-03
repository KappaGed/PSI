import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user!: User | null;
  loading: boolean = true;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const username = params['username'];
      this.loading = true;
      this.userService.getByUsername(username).subscribe({
        next: user => {
          this.user = user;
        },
        error: err => {
          this.loading = false;
          console.log(err);
        },
        complete: () => {
          this.loading = false;
        }
      });
    });
  }



}
