import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.css']
})
export class UserEventComponent implements OnInit {
  events: any = [];
  tab: any = [];
  constructor(private toasterService: ToasterService, private eventServer: EventService, private router: Router) { }


  ngOnInit(): void {
    this.eventServer.getEventList().subscribe(res => {
      this.tab = res
      console.log(this.events.length);
      
      console.log(res[0]._id == localStorage.getItem('user'));
      
      for (let i = 0; i < this.tab.length; i++) {
        if (res[i]._id === localStorage.getItem('user')) {
          this.events.push(this.tab[i])
        }
      }
      if (this.events.length===0) {
        alert('aucun evenement créer par vous')
      }
    });
  }
  edit(data) {
    location.href="http://localhost:4200/#/event/"+data._id;
  }
  

}
