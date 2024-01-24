import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAddEditFormComponent } from './doctor-add-edit-form.component';

describe('DoctorAddEditFormComponent', () => {
  let component: DoctorAddEditFormComponent;
  let fixture: ComponentFixture<DoctorAddEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorAddEditFormComponent]
    });
    fixture = TestBed.createComponent(DoctorAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
