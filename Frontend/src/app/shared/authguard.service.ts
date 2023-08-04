import { Injectable } from '@angular/core';
import { AuthserviceService } from './authservice.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private authService:AuthserviceService,private router: Router) { }

canActivate(): boolean {
    const token = this.authService.getToken();
    if (token) {
      // User is authenticated, allow access to the route
      return true;
    } else {
      // User is not authenticated, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}

