import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LowkerviewRoutingModule } from './lowkerview-routing.module';
import { LowkerviewComponent } from './lowkerview.component';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LowkerviewRoutingModule,

    RouterModule,
    MatProgressSpinnerModule
  ],
  declarations: [LowkerviewComponent],
  providers : []
})
export class LowkerviewModule { }
