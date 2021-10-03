import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(private toasterService: ToasterService,private userService: UserService,private route :Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  send(){
    this.userService.reset(this.form.value).subscribe(
      res => {
        this.toasterService.pop('success', 'Success send', res.message);
        console.log(res)
      }, error => {
        this.toasterService.pop('error', 'Error', error.error.message);
        console.log(error);
      }
    );
    this.route.navigate(['/UserLogin'])
  }

}
