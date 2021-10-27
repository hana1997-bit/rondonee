import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-modifier-pass',
  templateUrl: './modifier-pass.component.html',
  styleUrls: ['./modifier-pass.component.css']
})
export class ModifierPassComponent implements OnInit {
  form: FormGroup;
  constructor(private toasterService: ToasterService,private userService: UserService,private route :Router,private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl('', Validators.required),
      password1: new FormControl('', Validators.required),
    });
  }
 
  modifier(){
    this.userService.modifier(this.form.value, this.router.snapshot.params['id']).subscribe(
      res => {
        this.toasterService.pop('success', 'Success register', res.message);
        this.route.navigate(['/users/:id']);
        console.log(res)
      }, error => {
        this.toasterService.pop('error', 'Error', error.error.message);
        console.log(error);
      }
    );
  }

}
