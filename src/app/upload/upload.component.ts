import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  updateform: FormGroup;
  file: File;
  user: any;
  // img: any
  constructor(private toasterService: ToasterService, private userService: UserService, private route: Router, private router: ActivatedRoute) { }
  ngOnInit(): void {
    this.updateform = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required,Validators.minLength(8)]),
      // password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.userService.getUserbyId(this.router.snapshot.params['id']).subscribe(res => {
      this.user = res
      console.log(res);
      this.updateform.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phone: this.user.phone,
        email: this.user.email,
        // password: this.user.password,
      });
    });
  }
  // onChange(event) {
  //   this.file = event.target.files[0];
  //   // console.log(this.file);
  //   this.updateform.value.img = this.file

  // }
  change(){
    location.href="http://localhost:4200/#/modifier/" + this.router.snapshot.params['id'];
  }
  submitForm() {
    // const formData = new FormData();
    // formData.append('image', this.file, this.file.name);
    // formData.append('firstName', this.updateform.get('firstName').value);
    // formData.append('lastName', this.updateform.get('lastName').value);
    // formData.append('email', this.updateform.get('email').value);
    // formData.append('phone', this.updateform.get('phone').value);
    // formData.append('password', this.updateform.get('password').value);
    this.userService.update(this.updateform.value, this.router.snapshot.params['id']).subscribe(
      res => {
        // console.log(formData.get('image'));
        this.toasterService.pop('success', 'Success register', res.message);
        // this.route.navigate(['/UserLogin'])
        console.log(res)
      }, error => {
        this.toasterService.pop('error', 'Error', error.error.message);
        console.log(error);
      }
    );
    location.reload();
  }
}
