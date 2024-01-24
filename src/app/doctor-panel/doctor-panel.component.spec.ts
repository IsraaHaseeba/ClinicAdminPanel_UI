import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPanelComponent } from './doctor-panel.component';

describe('DoctorPanelComponent', () => {
  let component: DoctorPanelComponent;
  let fixture: ComponentFixture<DoctorPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorPanelComponent]
    });
    fixture = TestBed.createComponent(DoctorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
