import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  confirmationMessage!: string;
  errorMessage!: string;
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {  }

  ngOnInit() {
    // to:do - maybe password and username validator standalone classes

    // initializes form
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).*$')]]
    });
  }


  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    const username = this.signupForm.controls['username'].value;
    const password = this.signupForm.controls['password'].value;

    // validation, call service
  }

}
