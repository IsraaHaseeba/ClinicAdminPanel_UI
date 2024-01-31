import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsPanelComponent } from './lookups-panel.component';

describe('LookupsPanelComponent', () => {
  let component: LookupsPanelComponent;
  let fixture: ComponentFixture<LookupsPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookupsPanelComponent]
    });
    fixture = TestBed.createComponent(LookupsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
