import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { EventService } from '../../../services/event.service';
import { ReserveService } from '../../../services/reserve.service';

@Component({
  selector: 'app-new-reserve',
  templateUrl: './new-reserve.component.html',
  styleUrls: ['./new-reserve.component.css']
})
export class NewReserveComponent implements OnInit {
 form:FormGroup;
 constructor(private toasterService: ToasterService,  private eventServer: EventService,private reserveService:ReserveService,private router: ActivatedRoute) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      event:new FormControl(localStorage.getItem('event')),
      nom: new FormControl('', Validators.required),
     phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
      prenom: new FormControl('', Validators.required),
    });
  }
  reserve(){
    this.reserveService.create(this.form.value).subscribe(
      res => {
        this.toasterService.pop('success', 'Success register', res.message);
        console.log(res)
      }, error => {
        this.toasterService.pop('error', 'Error', error.error.message);
        console.log(error);
      }
    );
    this.eventServer.update(this.form.value,localStorage.getItem('event')).subscribe(
      res => {
        this.toasterService.pop('success', 'Success register', res.message);
        console.log(res)
      }, error => {
        this.toasterService.pop('error', 'Error', error.error.message);
        console.log(error);
      }
    );
    location.reload();
  }
}
