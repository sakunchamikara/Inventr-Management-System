import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  user = new User();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required],
    });
  }

  openDialogLoginResponseFalse() {
    const dialogRef = this.dialog.open(NotificationComponent, {
      data: {
        title: 'Login',
        message: 'Wrong Credentials !',
      },
    });
  }

  openDialogLoginResponseTrue() {
    const dialogRef = this.dialog.open(NotificationComponent, {
      data: {
        title: 'Login',
        message: 'Login Successful !',
      },
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.user.email = this.loginForm.get('email').value;
    this.user.password = this.loginForm.get('password').value;

    this.authService.login(this.user).subscribe(
      (data) => {
        if (data) {
          this.router.navigate([
            '/system/viewItems'],
            { skipLocationChange: true },
          );
          window.sessionStorage.setItem('isUserLoggeIn', 'true');
          this.openDialogLoginResponseTrue();
        } else {
          this.openDialogLoginResponseFalse();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
