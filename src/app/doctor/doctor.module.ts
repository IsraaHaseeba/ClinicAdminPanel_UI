import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorPanelComponent } from './doctor-panel/doctor-panel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    DoctorPanelComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ]
})
export class DoctorModule { }
