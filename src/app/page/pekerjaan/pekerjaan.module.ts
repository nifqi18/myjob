import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PekerjaanRoutingModule } from './pekerjaan-routing.module';
import { PekerjaanComponent } from './pekerjaan.component';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule, MatButtonToggleModule, MatAutocompleteModule } from '@angular/material';
import { LowonganModule } from '@app/component/lowcard/index.module';
import { SharedModule } from '@app/shared';
import { ListPortofolioComponent } from '@app/component/list-portofolio/list-portofolio.component';

@NgModule({
  imports: [
    CommonModule,
    PekerjaanRoutingModule,

    SharedModule,
    
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    LowonganModule.forRoot()
  ],
  declarations: [PekerjaanComponent , ListPortofolioComponent]
})
export class PekerjaanModule { }
