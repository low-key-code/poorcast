import { AuthService } from './../../../services/auth.service';
import { TextInputComponent } from './../../../../shared/components/forms/text-input/text-input.component';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SignInType } from 'src/app/models/types';
import { FeedBackMsgs } from 'src/app/models/interfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['../sign-in-page.component.scss']
})
export class SignInFormComponent implements OnInit {
  @ViewChildren(TextInputComponent) inputs!: QueryList<TextInputComponent>;

  form!: UntypedFormGroup;
  type: SignInType = 'Sign In';
  isLoading = false;
  errorMessage = '';

  feedbacks: FeedBackMsgs = {
    email: 'Please enter a valid email.',
    password: 'Password must be longer than 8 characters.',
    confirmPassword: 'Password doesn\'t match.'
  }

  constructor(private fb: UntypedFormBuilder, private pcAuth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new UntypedFormControl({ value: null, disabled: false }, [Validators.required, Validators.email]),
      password: new UntypedFormControl({ value: null, disabled: false }, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new UntypedFormControl({ value: null, disabled: false })
    })
  }

  changeType(val: SignInType) {
    this.type = val;

    this.inputs.forEach(input => {
      input.writeValue('');
    })

    this.form.reset({
      email: null,
      password: null,
      confirmPassword: null
    })
    
  }

  get isSignIn() {
    return this.type === 'Sign In'
  }

  get isSignUp() {
    return this.type === 'Sign Up'
  }

  get isReset() {
    return this.type === 'Reset'
  }

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  get confirmPassword() {
    return this.form.get('confirmPassword')
  }

  get passwordMatches() {
    if(this.type === 'Sign Up') {
      return this.password?.value === this.confirmPassword?.value;
    } else {
      return true;
    }
  }


  onSubmit() {
    this.isLoading = true;

    const email = this.email?.value;
    const password = this.password?.value;

    if(this.isSignIn) {
      this.pcAuth.signInEmailPass(email, password).subscribe(user => {
        this.router.navigate(['/app/overview']);
      });
    }

    if(this.isSignUp) {
      this.pcAuth.signUp(email, password).subscribe(user => {
        this.router.navigate(['/app/overview']);
      });
    }

    if(this.isReset) {
      this.pcAuth.resetPass(email).subscribe();
      this.inputs.forEach(input => {
        input.writeValue('');
      })
  
      this.form.reset({
        email: null,
        password: null,
        confirmPassword: null
      })
    }

    this.isLoading = false;
  }

}
