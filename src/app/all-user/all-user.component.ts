import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  user: any;
  show = true;
  form: FormGroup;
  file: File;
  admin = false;
  profil:any;
  constructor(private toasterService: ToasterService, private userService: UserService, private route: Router) { }
  ngOnInit(): void {
    this.userService.getUserList().subscribe(res => {
      this.user = res;
    });
    // if (localStorage.getItem('user') == "61ce344274bce70fe6915542") {
    //   this.admin = true;
    // }
    this.userService.getUserbyId(localStorage.getItem('user')).subscribe(res => {
      this.profil = res;
    });
  }

  isAdmin(user) {
    return user._id === "61ce344274bce70fe6915542";
    }
    modifier(user){
      return user._id===localStorage.getItem('user')
    }
  edit(data) {
    location.href = "http://localhost:4200/#/users/" + data._id
  }
  delete(data) {
    this.userService.deleteUser(data._id).subscribe(res => {
      location.reload();
      this.toasterService.pop('success', 'Success register');
      console.log(res)
    }, error => {
      this.toasterService.pop('error', 'Error', error.error.message);
      console.log(error);
    })
  }
}
