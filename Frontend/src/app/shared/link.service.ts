import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/login'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Method to handle the login request
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(this.apiUrl, loginData);
  }
  isLoginTrue(){
    return localStorage.getItem('token');
  }
}
