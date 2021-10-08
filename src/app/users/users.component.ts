import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService],
})
export class UsersComponent implements OnInit {
  
  form: FormGroup;

  constructor(private toasterService: ToasterService,private userService: UserService,private route :Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      image:new FormControl(''),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      img: new FormControl(null,Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),

    });
  }
  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.form.value.img = reader.result.toString();
      // console.log(this.form.value.img);
      
    };
  }
  submitForm() {
    this.userService.create(this.form.value).subscribe(
      
      
      res => {
        console.log(this.form.value);
        this.toasterService.pop('success', 'Success register', res.message);
        
        // this.route.navigate(['/UserLogin'])
        console.log(res)
      }, error => {
        this.toasterService.pop('error', 'Error', error.error.message);
        console.log(error);
      }
    );
    

  }
}
  

 