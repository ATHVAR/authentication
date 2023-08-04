import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentdataService {
  studdetail:any;
  constructor(public http:HttpClient) { }

  addstudent(data:any){
    return this.http.post<any>('http://localhost:3000/addstuds',data);
  }

  getstudentdata(){
    return this.http.get('http://localhost:3000/viewstud');
  }

  editstud(updatedData:any,id:any){
    return this.http.put(`http://localhost:3000/editstuds/${id}`,updatedData)
  }

  getoneitem(id:any){
    return this.http.get(`http://localhost:3000/getone/${id}`)
  }

  delitem(id:any){
    return this.http.delete(`http://localhost:3000/deleteitem/${id}`)
  }
}
