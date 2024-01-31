import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupRoutingModule } from './lookup-routing.module';
import { LookupsPanelComponent } from './lookups-panel/lookups-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    LookupsPanelComponent
  ],
  imports: [
    CommonModule,
    LookupRoutingModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ]
})
export class LookupModule { }
