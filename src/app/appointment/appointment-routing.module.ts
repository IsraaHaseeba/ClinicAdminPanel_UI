import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsPanelComponent } from './appointments-panel/appointments-panel.component';

const routes: Routes = [
  {path: '', component: AppointmentsPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
