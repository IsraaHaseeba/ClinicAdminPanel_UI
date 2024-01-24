import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule } from '@angular/common/http';
import { DoctorPanelComponent } from './doctor-panel/doctor-panel.component';
import { PatientPanelComponent } from './patient-panel/patient-panel.component';
import { LookupsPanelComponent } from './lookups-panel/lookups-panel.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AppointmentsPanelComponent } from './appointments-panel/appointments-panel.component';
import { AppointmentAddEditFormComponent } from './appointments-panel/appointment-add-edit-form/appointment-add-edit-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DoctorAddEditFormComponent } from './doctor-panel/doctor-add-edit-form/doctor-add-edit-form.component';
import { LookupsAddEditFormComponent } from './lookups-panel/lookups-add-edit-form/lookups-add-edit-form.component';
import { PatientAddEditFormComponent } from './patient-panel/patient-add-edit-form/patient-add-edit-form.component';
import { CategoryAddEditFormComponent } from './lookups-panel/category-add-edit-form/category-add-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorPanelComponent,
    PatientPanelComponent,
    LookupsPanelComponent,
    SideMenuComponent,
    AppointmentsPanelComponent,
    AppointmentAddEditFormComponent,
    DoctorAddEditFormComponent,
    LookupsAddEditFormComponent,
    PatientAddEditFormComponent,
    CategoryAddEditFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  exports:[
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
