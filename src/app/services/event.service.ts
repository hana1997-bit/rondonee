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
  getEventList() {
    return this.http.get('http://localhost:3000/agents');
  }
  getEventListById(_id: string) {
    return this.http.get('http://localhost:3000/agents' + `/${_id}`);
  }
  update(body:any,_id: string): Observable<any>{
    return this.http.put('http://localhost:3000/agents' + `/${_id}` ,body);
  }
  delete(_id: string) {
    return this.http.delete('http://localhost:3000/agents' + `/${_id}`);
  }

  
}
