import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAddEditFormComponent } from './patient-add-edit-form.component';

describe('PatientAddEditFormComponent', () => {
  let component: PatientAddEditFormComponent;
  let fixture: ComponentFixture<PatientAddEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientAddEditFormComponent]
    });
    fixture = TestBed.createComponent(PatientAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
