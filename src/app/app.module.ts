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
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DoctorPanelComponent,
    PatientPanelComponent,
    LookupsPanelComponent,
    SideMenuComponent,
    AppointmentsPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
  ],
  exports:[
  ],
  providers: [
    NgbActiveModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
