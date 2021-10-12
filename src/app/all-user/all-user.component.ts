import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  user: any;
  constructor(private toasterService: ToasterService, private userService: UserService, private route: Router) { }


  ngOnInit(): void {
    this.userService.getUserList().subscribe(res => {
      this.user = res
      console.log(res[2].image);
      
    });
  }
  delete(data) {
    console.log(data._id)
    // location.href="http://localhost:4200/#/users/"+data._id
    this.userService.deleteUser(data._id).subscribe(res => {
      location.reload();
        this.toasterService.pop('success', 'Success register');
      console.log(res)
    }, error => {
      this.toasterService.pop('error', 'Error', error.error.message);
      console.log(error);
    }

    )


  }
}
