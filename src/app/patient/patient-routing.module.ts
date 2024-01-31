import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientPanelComponent } from './patient-panel/patient-panel.component';

const routes: Routes = [
  {path: '', component: PatientPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
