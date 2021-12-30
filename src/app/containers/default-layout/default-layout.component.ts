import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import {ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  log="";
  events:any=[];
  show="";
  searchText;
  constructor(private toasterService: ToasterService,private eventServer:EventService,private router: Router,@Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  ngOnInit(): void {
    this.log=localStorage.getItem('user');
    this.eventServer.getEventList().subscribe(res => {
      this.events = res
      // console.log(this.events[1].imgs[0]);
      
    });

  }
  voir(data){
    location.href="http://localhost:4200/#/event/"+data._id;

  }
  out(){
    localStorage.removeItem("user");
    this.router.navigateByUrl('/#');
  }
}
