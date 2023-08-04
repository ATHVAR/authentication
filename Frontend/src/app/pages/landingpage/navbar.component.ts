import { Component } from '@angular/core';
import { LoginFormVisibilityService } from 'src/app/shared/login-form-visiblity.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showLoginForm: boolean = false;

  constructor(private loginFormVisibilityService: LoginFormVisibilityService) {
    this.loginFormVisibilityService.showLoginForm$.subscribe(
      (visibility: boolean) => {
        this.showLoginForm = visibility;
      }
    );
  }

  login() {
    this.loginFormVisibilityService.setShowLoginFormVisibility(true);
    this.showLoginForm = true;
  }

  onLoginSubmitted() {
    // This function will be called when the login form is submitted
    this.loginFormVisibilityService.setLoggedIn(true);
  }

}
