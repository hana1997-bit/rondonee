import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  file:File;
  form: FormGroup;

  constructor(private toasterService: ToasterService,private userService: UserService,private route :Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      // image:new FormControl(''),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required,Validators.minLength(8)]),
      password: new FormControl('', Validators.required),
      img: new FormControl(null,Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),

    });
  }
  // handleUpload(event) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.form.value.img = reader.result.toString();
  //     // console.log(this.form.value.img);
      
  //   };
  // }
  onChange(event) {
     this.file = event.target.files[0];
    console.log(this.file);
    this.form.value.img=this.file
    console.log(this.file.name);
    localStorage.setItem('image',this.file.name)
    
    
}
  submitForm() {
    // const formData =new FormData();
    // formData.append('image', this.file,this.file.name);
    // formData.append('firstName',this.form.get('firstName').value);
    // formData.append('lastName',this.form.get('lastName').value);
    // formData.append('email',this.form.get('email').value);
    // formData.append('phone',this.form.get('phone').value);
    // formData.append('password',this.form.get('password').value);
    this.userService.create(this.form.value).subscribe(
      res => {
        this.toasterService.pop('success', 'Success register', res.message);
        this.route.navigate(['/login'])
        console.log(res)
      }, error => {
        this.toasterService.pop('error', 'Error', error.error.message);
        console.log(error);
      }
    );
  }
}
  
