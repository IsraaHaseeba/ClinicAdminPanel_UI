import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentAddEditFormComponent } from './appointment-add-edit-form.component';

describe('AppointmentAddEditFormComponent', () => {
  let component: AppointmentAddEditFormComponent;
  let fixture: ComponentFixture<AppointmentAddEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentAddEditFormComponent]
    });
    fixture = TestBed.createComponent(AppointmentAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
