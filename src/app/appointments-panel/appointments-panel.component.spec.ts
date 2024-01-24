import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsPanelComponent } from './appointments-panel.component';

describe('AppointmentsPanelComponent', () => {
  let component: AppointmentsPanelComponent;
  let fixture: ComponentFixture<AppointmentsPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsPanelComponent]
    });
    fixture = TestBed.createComponent(AppointmentsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
