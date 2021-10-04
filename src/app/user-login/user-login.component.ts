import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  form: FormGroup;
  constructor(private toasterService: ToasterService,private userService: UserService,private route :Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  login(){
    this.userService.login(this.form.value).subscribe(
      res => {
      this.toasterService.pop('success', 'Success Login', res.message);
        console.log(res);
        localStorage.setItem('token', res.token);
      }, error => {
        // this.toasterService.pop('error', 'Error', res.message);
        console.log(error);
      }
    );
  }

}
