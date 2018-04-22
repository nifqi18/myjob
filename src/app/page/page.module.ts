import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { AboutComponent } from '@app/page/about/about.component';
import { SharedModule } from '@app/shared';
import { CostumListComponent } from '@app/component/costum-list/costum-list.component';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedModule , 
    
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  declarations: [AboutComponent , CostumListComponent ]
})
export class PageModule { 
  constructor(){}
}
