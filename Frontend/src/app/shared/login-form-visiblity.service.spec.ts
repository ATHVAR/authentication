import { TestBed } from '@angular/core/testing';

import { LoginFormVisiblityService } from './login-form-visiblity.service';

describe('LoginFormVisiblityService', () => {
  let service: LoginFormVisiblityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginFormVisiblityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
