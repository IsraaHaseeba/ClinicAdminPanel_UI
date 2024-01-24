import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsAddEditFormComponent } from './lookups-add-edit-form.component';

describe('LookupsAddEditFormComponent', () => {
  let component: LookupsAddEditFormComponent;
  let fixture: ComponentFixture<LookupsAddEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookupsAddEditFormComponent]
    });
    fixture = TestBed.createComponent(LookupsAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
