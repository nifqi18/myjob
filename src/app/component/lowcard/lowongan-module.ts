import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LowcardComponent } from '@app/component/lowcard/lowongan-card';
import { MatCardModule, MatMenuModule, MatExpansionModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  declarations: [LowcardComponent] , 
  exports : [LowcardComponent]
})
export class ChildLowonganModule { }
