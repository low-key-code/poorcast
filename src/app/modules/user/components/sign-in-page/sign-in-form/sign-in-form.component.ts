import { TextInputComponent } from './../../../../shared/components/forms/text-input/text-input.component';
import { Component, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

type SignInType = 'Sign In' | 'Sign Up' | 'Reset';
interface FeedBackMsgs  {
  [key: string]:  string;
}

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
})
export class SignInFormComponent implements OnInit {
  @ViewChildren(TextInputComponent) inputs!: QueryList<TextInputComponent>;

  form!: FormGroup;
  type: SignInType = 'Sign In';
  isLoading = false;
  errorMessage = '';

  feedbacks: FeedBackMsgs = {
    email: 'Please enter a valid email.',
    password: 'Password must be longer than 8 characters.',
    confirmPassword: 'Password doesn\'t match.'
  }

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.email]),
      password: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl({ value: null, disabled: false })
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
      return true
    }

  }

  onSubmit() {

  }

}
