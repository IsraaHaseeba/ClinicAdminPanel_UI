import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupsPanelComponent } from './lookups-panel/lookups-panel.component';

const routes: Routes = [
  {path: '', component: LookupsPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupRoutingModule { }
