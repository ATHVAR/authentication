import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification:any;
  constructor(public http:HttpClient) { }

  addmessage(data:any){
    return this.http.post<any>('http://localhost:3000/addmess',data);
  }

  delmessage(id:any){
    return this.http.delete(`http://localhost:3000/deletemess/${id}`)
  }

  viewmessage(){
    return this.http.get('http://localhost:3000/viewmess');
  }
}
