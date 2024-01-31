import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientPanelComponent } from './patient-panel/patient-panel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    PatientPanelComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ]
})
export class PatientModule { }
