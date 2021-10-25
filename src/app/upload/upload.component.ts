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
  form: FormGroup;
  file: File;
  user: any;
  bla: any
  img: any
  constructor(private toasterService: ToasterService, private userService: UserService, private route: Router, private router: ActivatedRoute) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      image: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      img: new FormControl(null, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.user = {
      id: this.router.snapshot.params['id']
    }
    console.log(this.form.value.firstName);
    this.userService.getUserbyId(this.router.snapshot.params['id']).subscribe(res => {
      this.bla = res
      console.log(res);
      this.bla.image=localStorage.getItem('image');
    console.log(this.bla);
    
    })
    
  }
  onChange(event) {
    this.file = event.target.files[0];
    // console.log(this.file);
    this.form.value.img = this.file

  }
  submitForm() {
    const formData = new FormData();
    formData.append('image', this.file, this.file.name);
    formData.append('firstName', this.form.get('firstName').value);
    formData.append('lastName', this.form.get('lastName').value);
    formData.append('age', this.form.get('age').value);
    formData.append('email', this.form.get('email').value);
    formData.append('phone', this.form.get('phone').value);
    formData.append('password', this.form.get('password').value);
    console.log(this.form.value.firstName);
    this.userService.update(formData,this.router.snapshot.params['id']).subscribe(
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


  }
}
