import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  file:File;
  form: FormGroup;

  constructor(private toasterService: ToasterService,private userService: UserService,private route :Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),

    });
  }
  
  submitForm() {
    this.userService.create(this.form.value).subscribe(
      res => {
        this.toasterService.pop('success', 'Success register', res.message);
        console.log(res);
        alert(res.message);
        this.route.navigate(['/login']);
      }, error => {
        this.toasterService.pop('error', 'Error', error.error.message);
        console.log(error);
        alert(error.message)
      }
    );
  }
}
  
