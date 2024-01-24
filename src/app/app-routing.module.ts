import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorPanelComponent } from './doctor-panel/doctor-panel.component';
import { PatientPanelComponent } from './patient-panel/patient-panel.component';
import { LookupsPanelComponent } from './lookups-panel/lookups-panel.component';
import { AppointmentsPanelComponent } from './appointments-panel/appointments-panel.component';

const routes: Routes = [
  {path: 'doctors', component: DoctorPanelComponent},
  {path: 'patients', component: PatientPanelComponent},
  {path: 'lookups', component: LookupsPanelComponent},
  {path: 'appointments', component: AppointmentsPanelComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
