import { Component } from '@angular/core';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-editprofilemodal',
  templateUrl: './editprofilemodal.component.html',
  styleUrls: ['./editprofilemodal.component.css']
})
export class EditProfileModalComponent {
  user!: User | null;
  editProfileForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  selectedProfilePicture: { url: string } | null = null;

  profilePictures = [
    { url: 'https://img.freepik.com/free-vector/cute-astronaut-chill-relaxation-game-controller-cartoon-vector-icon-illustration-technology-science-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3717.jpg' },
    { url: 'https://i.pinimg.com/736x/14/14/ae/1414ae07da855ffcf2b85201b8ee228f.jpg' },
    { url: 'https://img.freepik.com/free-vector/cute-panda-listening-music-with-boombox-cartoon-vector-icon-illustration-animal-music-isolated-flat_138676-6791.jpg' },
    { url: 'https://img.freepik.com/free-vector/cute-bear-robot-cyborg-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated_138676-6886.jpg?w=826&t=st=1684000798~exp=1684001398~hmac=25bc2f3735327452e2e03eb53637e466abf9058297bde8acddeccc1b5020a39b' }
  ];

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]],
      profilePicture: ['', Validators.required]
    });

    this.authService.getLoggedInUser().subscribe(user => {
      this.user = user;
      this.editProfileForm.patchValue({
        username: user?.username,
        profilePicture: user?.profilePicture
      });
    });
  }

  selectProfilePicture(picture: any) {
    this.selectedProfilePicture = picture;
    this.editProfileForm.patchValue({
      profilePicture: picture.url
    });
  }


  saveChanges(): void {
    if (this.editProfileForm.invalid) {
      return;
    }

    const { username, profilePicture } = this.editProfileForm.value;
    const userId = localStorage.getItem('loggedInUser');

    if (username !== this.user?.username) {
      // check if the new username already exists
      this.userService.getByUsername(username).subscribe((data) => {
        if (data) {
          this.errorMessage = 'Username already exists';
        } else {
          this.updateUser(userId, username, profilePicture);
        }
      }, error => {
        this.updateUser(userId, username, profilePicture);
      });
    } else {
      this.updateUser(userId, username, profilePicture);
    }
  }

  private updateUser(userId: string | null, username: string, profilePicture: string): void {
    this.userService.update(userId, { username, profilePicture }).subscribe(() => {
      this.successMessage = 'Profile updated successfully!';
      this.activeModal.close(username); // pass the updated username as the result
    }, error => {
      this.errorMessage = 'Error updating profile';
    });
  }


}



