import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

let authObs: Observable<AuthResponseData>;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  constructor(private authService: AuthService , private router: Router) { }
  
  ngOnInit(): void {
  }
  isLoginMode = true;
  isloading = false;
  error: string = null;
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }
    this.isloading = true;
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
    }
    else{
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isloading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isloading = false;
      }
    );
    form.reset();
  }
}
