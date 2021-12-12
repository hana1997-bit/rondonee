import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  constructor(private http: HttpClient) { }
  
  create(body:any): Observable<any>{
    return this.http.post('http://localhost:3000/creat', body);
  }
  getAllReserve() {
    return this.http.get('http://localhost:3000/reserves');
  }
  getReserveById(_id: string) {
    return this.http.get('http://localhost:3000/reserves' + `/${_id}`);
  }
  update(body:any,_id: string): Observable<any>{
    return this.http.put('http://localhost:3000/reserves' + `/${_id}` ,body);
  }
  delete(_id: string) {
    return this.http.delete('http://localhost:3000/reserves' + `/${_id}`);
  }
}
