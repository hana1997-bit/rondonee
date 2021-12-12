import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  files: File;
  form: FormGroup;
  imgs = [];
  constructor(private toasterService: ToasterService, private eventServer: EventService, private route: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      localisation: new FormControl('', Validators.required),
      imgs: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
      evenement: new FormControl('', Validators.required),
      temps: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      user: new FormControl(),
      prix: new FormControl(null, Validators.required),
    });
    localStorage.setItem('user',"617940e3f7d251d5a54feafa")
  }
  onChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        console.log(event.target.files[i]);
        this.imgs.push(event.target.files[i]);
      }
      console.log("imgs" + this.imgs);
    }
  }

  submitForm() {
    const formData = new FormData();
    for (let i = 0; i < this.imgs.length; i++) {
      formData.append('imgs', this.imgs[i]);
    }    
    formData.append('evenement', this.form.get('evenement').value);
    formData.append('temps', this.form.get('temps').value);
    formData.append('localisation', this.form.get('localisation').value);
    formData.append('phone', this.form.get('phone').value);
    formData.append('nombre', this.form.get('nombre').value);
    formData.append('user', localStorage.getItem("user"));
    formData.append('prix', this.form.get('prix').value);
    console.log(formData);
    this.eventServer.create(formData).subscribe(
      res => {
        this.toasterService.pop('success', 'Success register', res.message);
        // this.route.navigate(['/'])
        console.log(res)
      }, error => {
        this.toasterService.pop('error', 'Error', error.message);
        console.log(error);
      }
    );

  }

}
