import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  user = {
    email: "",
    password: ""
  }
  constructor(private userService: UserService,private route :Router) { }

  ngOnInit(): void {
  }
  login(){
    const body={
      email:this.user.email,
      password:this.user.password
    }
    this.userService.login(body).subscribe(
      res => {
        console.log(res)
      }, error => {
        console.log(error);
      }
    );
  }

}
