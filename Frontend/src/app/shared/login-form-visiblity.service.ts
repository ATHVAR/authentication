import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginFormVisibilityService {
  private showLoginForm = new BehaviorSubject<boolean>(false);
  showLoginForm$ = this.showLoginForm.asObservable();
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  setShowLoginFormVisibility(visible: boolean) {
    this.showLoginForm.next(visible);
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn.next(loggedIn);
  }
}
