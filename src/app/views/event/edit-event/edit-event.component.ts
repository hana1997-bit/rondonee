import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  files: File;
  form: FormGroup;
  images = [];
  event:any;
  visible=false;
  nombrem=0;
  constructor(private toasterService: ToasterService,private eventServer:EventService,private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      local: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
     phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
      event: new FormControl('', Validators.required),
      temps: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
    });
    this.eventServer.getEventListById(this.router.snapshot.params['id']).subscribe(res => {
      this.event = res 
      console.log(res);
      this.form.setValue({
        local: this.event.local,
       event: this.event.event,
       phone: this.event.phone,
        photo: this.event.photo,
        temps: this.event.temps,
        nombre:this.event.nombre,
      });
    });
  }
  onChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);
          this.form.patchValue({
            fileSource: this.images
          });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
    console.log(this.images);
  }
  submitForm(){
    this.eventServer.update(this.form.value,this.router.snapshot.params['id']).subscribe(
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
