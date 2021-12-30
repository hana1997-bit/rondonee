import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { EventService } from '../../../services/event.service';
import { ReserveService } from '../../../services/reserve.service';

@Component({
  selector: 'app-affiche-event',
  templateUrl: './affiche-event.component.html',
  styleUrls: ['./affiche-event.component.css']
})
export class AfficheEventComponent implements OnInit {
  events: any = [];
  tabRes: any = [];
  show = false;
  reserver = true;
  form: FormGroup;
  send = 0
  tab: any = [];
  images = [];

  constructor(private toasterService: ToasterService, private reserveService: ReserveService, private eventServer: EventService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventServer.getEventListById(this.router.snapshot.params['id']).subscribe(res => {
      this.events = res
      this.images=this.events.imgs;
      console.log(this.images);
      
      console.log(this.events);
      this.send = this.events.nombre;
      console.log(this.send);
      if (this.events.user == localStorage.getItem('user')) {
        this.show = true;
      }
    });
    this.form = new FormGroup({
      event: new FormControl(this.router.snapshot.params['id']),
      nom: new FormControl('', Validators.required),
      telephone: new FormControl('', [Validators.required, Validators.minLength(8)]),
      prenom: new FormControl('', Validators.required),
    });

    this.reserveService.getAllReserve().subscribe(res => {
      this.tab = res;
      for (let i = 0; i < this.tab.length; i++) {
        if (this.tab[i].event = this.router.snapshot.params['id']) {
          this.tabRes.push(this.tab[i])
        }
      }
      console.log(this.tabRes);
    });

  }
  reserve() {
    //  localStorage.setItem("event",this.router.snapshot.params['id']);
    //  location.href="http://localhost:4200/#/reserve"
    this.reserver = false;
  }
  edit(data) {
    location.href = "http://localhost:4200/#/agents/" + data._id
  }
  delete(data) {
    this.eventServer.delete(data._id).subscribe(res => {
      this.toasterService.pop('success', 'Success register');
      console.log(res)
    }, error => {
      this.toasterService.pop('error', 'Error', error.error.message);
      console.log(error);
    });
    location.href = "http://localhost:4200/#";
  }
  submit() {
    console.log(this.form.value);

    this.reserveService.create(this.form.value).subscribe(
      res => {
        this.toasterService.pop('success', 'Success register', res.message);
        console.log(res)
        this.events.nombre = this.events.nombre - 1;
        this.eventServer.update(this.events, this.router.snapshot.params['id']).subscribe(
          res => {
            this.toasterService.pop('success', 'Success register', res.message);
            console.log(res)
          }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
            console.log(error);
          }
        );
        location.href = "http://localhost:4200/#";
      }, error => {
        this.toasterService.pop('error', 'Error', error.error.message);
        console.log(error);
      }
    );

  }
  supprimer(data){
    this.reserveService.delete(data._id).subscribe(res => {
      this.toasterService.pop('success', 'Success register');
      console.log(res)
      this.events.nombre = this.events.nombre + 1;
      this.eventServer.update(this.events, this.router.snapshot.params['id']).subscribe(
        res => {
          this.toasterService.pop('success', 'Success register', res.message);
          console.log(res)
          location.reload();
        }, error => {
          this.toasterService.pop('error', 'Error', error.error.message);
          console.log(error);
        }
      );
    }, error => {
      this.toasterService.pop('error', 'Error', error.error.message);
      console.log(error);
    });
  }

}
