import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
// import { ngForm } from '@angular/forms';

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
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
    password: "",
    phone:""
  }
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getUserList().subscribe(res => {
      this.myres = res
    });
    // this.form = new FormGroup({
    //   firstName: new FormControl('', Validators.required),
    //   lastName: new FormControl('', Validators.required),
    //   age: new FormControl('', Validators.required),
    //   // genre: new FormControl('', Validators.required),
    //   password: new FormControl('', Validators.required),
    //   // local: new FormControl('', Validators.required),
    //   email: new FormControl('', [Validators.required, Validators.email]),

    // });
  }
  submitForm() {
    const body = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      age: this.user.age,
      email: this.user.email,
      phone: this.user.phone,

      password: this.user.password
    }
    this.userService.create(body).subscribe(
      res => {
        console.log(res)
      }, error => {
        console.log(error);
      }
    )

  }
}
  // submitForm() {
  //   if (form)
  //     form.reset();
  //   this.userService.selectedUser = {
  //     _id: "",
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     password: "",
  //     age: 0
  //   }
  // }

  // onSubmit(form: form) {
  //   if (form.value._id == "") {
  //     this.userService.create(form.value).subscribe((res) => {
  //       this.resetForm(form);
  //       // M.toast({ html: 'Saved successfully', classes: 'rounded' });
  //     });
  //   }
  //   // else {
  //   //   this.userService.putUser(form.value).subscribe((res) => {
  //   //     this.resetForm(form);
  //   //     // M.toast({ html: 'Updated successfully', classes: 'rounded' });
  //   //   });
  //   // }
  // }

// }
