import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService],
})
export class UsersComponent implements OnInit {
  myres: any;
  form: FormGroup;
  user = {
    image:"",
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
    password: "",
    phone:""
  }
  constructor(private userService: UserService,private route :Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      image:new FormControl(''),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      // local: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),

    });
  }
  submitForm() {
    this.userService.create(this.form.value).subscribe(
      res => {
        console.log(res)
      }, error => {
        console.log(error);
      }
    );
    this.route.navigate(['/UserLogin'])

  }
}
  

 