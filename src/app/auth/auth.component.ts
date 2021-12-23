import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService, AuthResponseData } from './authenticate.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authenticateService: AuthenticateService, private router: Router) { }

  ngOnInit(){
    this.authForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, , Validators.minLength(6)])
    });
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: FormGroup){
    if(!form.valid){
      return
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObservable : Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      authObservable = this.authenticateService.login(email, password);
    }
    else{
      authObservable = this.authenticateService.signup(email, password);
    }
    authObservable.subscribe(response => {
      this.router.navigate(['/recipe'])
      console.log(response);
      this.isLoading = false
    },errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    }
  );

    form.reset();
  }
  
}
