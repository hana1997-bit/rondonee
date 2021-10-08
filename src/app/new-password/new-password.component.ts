import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  form: FormGroup;
  id:any
  token:any
    constructor(private activatetRoute: ActivatedRoute,private toasterService: ToasterService,private userService: UserService,private route :Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.email]),
      userId: new FormControl(''),
      token: new FormControl(''),
    });
  }
  change(){
    this.form.value.userId=this.activatetRoute.snapshot.params['id'];
   this.form.value.token=this.activatetRoute.snapshot.params['token'];
    
    this.userService.changePass(this.form.value).subscribe(
      res => {
        // this.toasterService.pop('success', 'Success send',res);
          console.log(res);
    this.route.navigate(['/UserLogin'])

      }, error => {
        this.toasterService.pop('error', 'Error', error.error.message);
        console.log(error);
      }
    );
    // this.route.navigate(['/UserLogin'])
  }

}
