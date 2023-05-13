import { Component } from '@angular/core';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';

@Component({
  selector: 'app-editprofilemodal',
  templateUrl: './editprofilemodal.component.html',
  styleUrls: ['./editprofilemodal.component.css']
})
export class EditProfileModalComponent {
  user!: User | null;
  editProfileForm: FormGroup;
  error: string | null = null;
  successMessage: string | null = null;
  profilePictures: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.editProfileForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]],
      profilePicture: ['', Validators.required]
    });
  }

  saveChanges() {
    if (this.editProfileForm.valid) {
      const { username, profilePicture } = this.editProfileForm.value;
      if (username !== this.user?.username) {
        this.userService.getByUsername(username).subscribe(
          (existingUser) => {
            if (existingUser) {
              this.error = 'Username is not available.';
            } else {
              this.updateProfile(username, profilePicture);
            }
          },
          (error) => {
            this.error = 'Failed to check username availability. Please try again later.';
          }
        );
      } else {
        this.updateProfile(username, profilePicture);
      }
    } else {
      this.error = 'Invalid form data. Please check the fields.';
    }
  }

  updateProfile(username: string, profilePicture: string) {
    if (this.editProfileForm.valid) {
      const { username, profilePicture } = this.editProfileForm.value;
      this.userService.update(this.user?.username, { username, profilePicture }).subscribe(
        () => {
          this.activeModal.close({ success: true });
        },
        (error) => {
          console.log(error);
          // handle the error appropriately
        }
      );
    } else {
      // handle the form validation errors
    }
  }


}



