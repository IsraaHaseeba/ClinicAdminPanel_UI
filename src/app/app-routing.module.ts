import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'doctors', loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule)},
  {path: 'patients', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule)},
  {path: 'lookups', loadChildren: () => import('./lookup/lookup.module').then(m => m.LookupModule)},
  {path: 'appointments', loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
