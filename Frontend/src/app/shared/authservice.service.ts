// import { Injectable } from '@angular/core';
// import{HttpClient} from '@angular/common/http'


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthserviceService {
//   [x: string]: any;
//   constructor(private http:HttpClient) { }

//   loginuser(user:any){
//     return this.http.post<any>("http://localhost:3000/api/authlogin",user);
//   }
//   isLoginTrue(){
//     return localStorage.getItem('token');
//   }
// }
// authservice.service.ts
// authservice.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiUrl = 'http://localhost:3000'; // Replace this with your server's URL

  constructor(private http: HttpClient) { }

  loginuser(user: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(tap((response) => {
      // Save the token and user role to local storage after a successful login
      localStorage.setItem('token', response.token);
      localStorage.setItem('userRole', response.role);
    }));
  }

  logout() {
    // Remove token from local storage on logout
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

