import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage!: string;
  formSubmitted = false;
  registrationSuccessMessage!: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.registrationSuccessMessage = params['registrationSuccessMessage'];
    });
    history.replaceState({}, '', '/login');
  }

  onSubmit() {
    this.formSubmitted = true;
    this.errorMessage = ''; // clear any previous error messages

    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.login(username, password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['dashboard']);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        }
      });
  }

  onRegisterLinkClick() {
    this.router.navigate(['/register']);
  }

}
