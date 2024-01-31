import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentsPanelComponent } from './appointments-panel/appointments-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppointmentsPanelComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ]
})
export class AppointmentModule { }
