import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  
  create(body:any): Observable<any>{
    return this.http.post('http://localhost:3000/creation', body);
  }
  getUserList() {
    return this.http.get('http://localhost:3000/agents');
  }

  
}
