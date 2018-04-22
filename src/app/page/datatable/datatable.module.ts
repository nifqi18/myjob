import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatableRoutingModule } from './datatable-routing.module';
import { DatatableComponent } from '@app/page/datatable/datatable.component';
import { SharedModule } from '@app/shared';
import { MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DatatableRoutingModule,
    SharedModule,
    MatTableModule
  ],
  declarations: [ DatatableComponent]
})
export class DatatableModule { }
