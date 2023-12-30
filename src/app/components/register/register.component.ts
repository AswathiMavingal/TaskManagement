import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  faLock = faLock;
  loginForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    if (this.loginForm.valid) {
      //callservice;
      let subscription = {
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['dashboard']);
        },
        error: (err: any) => {
          alert(err); //need to use throwError t service.elese wrong message
        },
        complete: console.log,
      };
      this.authService.signup(this.loginForm.value).subscribe(subscription);
    }
  }
}
