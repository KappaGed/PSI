import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import { Router, NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  successMessage!: string;
  errorMessage!: string;
  signupForm!: FormGroup;
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // initializes form
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$')]]
    });
  }


  onSubmit(): void {
    this.formSubmitted = true;
    this.errorMessage = ''; // clear any previous error messages

    if (this.signupForm.invalid) {
      return;
    }

    const username = this.signupForm.controls['username'].value;
    const password = this.signupForm.controls['password'].value;

    this.authService.signup(username, password)
    .pipe(first())
    .subscribe({
      next: (response) => {
        this.successMessage = "User successfully created!";
        // send success message to router so it can be displayed
        const navigationExtras: NavigationExtras = {
          queryParams: { registrationSuccessMessage: this.successMessage }
        };
        this.router.navigate(['login'], navigationExtras);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    });
  }

  onLoginLinkClick() {
    this.router.navigate(['/login']);
  }
}
