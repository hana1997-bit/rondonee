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
  show=true;
  form: FormGroup;
  file: File;
  constructor(private toasterService: ToasterService, private userService: UserService, private route: Router) { }
  ngOnInit(): void {
    this.userService.getUserList().subscribe(res => {
      this.user = res
    });
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      image: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      img: new FormControl(null, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }
  onChange(event) {
    this.file = event.target.files[0];
    console.log(this.file);
    this.form.value.img = this.file

  }
  // submitForm() {
  //   const formData = new FormData();
  //   formData.append('image', this.file, this.file.name);
  //   formData.append('firstName', this.form.get('firstName').value);
  //   formData.append('lastName', this.form.get('lastName').value);
  //   formData.append('age', this.form.get('age').value);
  //   formData.append('email', this.form.get('email').value);
  //   formData.append('phone', this.form.get('phone').value);
  //   formData.append('password', this.form.get('password').value);
  //   this.userService.getUserList(formData).subscribe(
  //     res => {
  //       console.log(formData.get('image'));
  //       this.toasterService.pop('success', 'Success register', res.message);
  //       // this.route.navigate(['/UserLogin'])
  //       console.log(res)
  //     }, error => {
  //       this.toasterService.pop('error', 'Error', error.error.message);
  //       console.log(error);
  //     }
  //   );


  // }
  edit(data) {
    location.href="http://localhost:4200/#/users/"+data._id
    

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
