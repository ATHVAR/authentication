import { Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/shared/link.service';
import { LoginFormVisibilityService } from 'src/app/shared/login-form-visiblity.service';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/shared/authservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthserviceService, private router: Router) {}

  onSubmit() {
    // Call the login service to perform the API call to your backend server
    this.authService.loginuser({ email: this.email, password: this.password }).subscribe(
      (response: any) => {
        // Login successful, store the token in local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        // Redirect to the appropriate page based on the role
        this.router.navigate(['/home']);
      },
      (error) => {
        // Login failed, display error message
        alert('Invalid credentials');
      }
    );
  }
}



  
