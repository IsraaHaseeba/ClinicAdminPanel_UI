import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAddEditFormComponent } from './category-add-edit-form.component';

describe('CategoryAddEditFormComponent', () => {
  let component: CategoryAddEditFormComponent;
  let fixture: ComponentFixture<CategoryAddEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryAddEditFormComponent]
    });
    fixture = TestBed.createComponent(CategoryAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
