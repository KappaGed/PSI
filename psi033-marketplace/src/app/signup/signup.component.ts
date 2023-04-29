import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  confirmationMessage!: string;
  errorMessage!: string;
  signupForm!: FormGroup;
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // to:do - fix password regex
    // initializes form
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$')]]
    });
  }


  onSubmit(): void {
    this.formSubmitted = true;
    if (this.signupForm.invalid) {
      return;
    }

    const username = this.signupForm.controls['username'].value;
    const password = this.signupForm.controls['password'].value;

    this.authService.signup(username, password)
    .pipe(first())
    .subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onLoginLinkClick() {
    this.router.navigate(['/login']);
  }
}
