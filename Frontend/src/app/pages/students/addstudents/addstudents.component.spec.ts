import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstudentsComponent } from './addstudents.component';

describe('AddstudentsComponent', () => {
  let component: AddstudentsComponent;
  let fixture: ComponentFixture<AddstudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddstudentsComponent]
    });
    fixture = TestBed.createComponent(AddstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
