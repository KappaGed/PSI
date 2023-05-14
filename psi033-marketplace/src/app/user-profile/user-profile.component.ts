import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from '../editprofilemodal/editprofilemodal.component';
import { AuthService } from '../auth.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user!: User | null;
  loading: boolean = true;
  successMessage: string | null = null;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private modalService: NgbModal, private authService: AuthService) { }

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

    this.route.queryParams.subscribe(params => {
      this.successMessage = params['successMessage'];
    });
  }

  isOwnProfile(): Observable<boolean> {
    return this.authService.getLoggedInUser().pipe(
      map(loggedInUser => (loggedInUser && loggedInUser.username === this.user?.username) || false)
    );
  }

  openEditProfileModal() {
    this.isOwnProfile().subscribe(isOwnProfile => {
      if (isOwnProfile) {
        const modalRef = this.modalService.open(EditProfileModalComponent);
        modalRef.componentInstance.user = this.user;

        modalRef.result.then((result: string | undefined) => {
          if (result) {
            const successMessage = 'Account successfully updated!';
            this.router.navigate(['/profile', result], { queryParams: { successMessage } }).then(() => {
              window.location.reload(); // reload the page after the redirect
            });
          }
        }).catch((error) => {
          console.log('Modal dismissed');
        });
      }
    });
  }




}
