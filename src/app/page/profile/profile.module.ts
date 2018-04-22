import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from '@app/page/profile/profile.component';

import { MatPaginatorModule } from '@angular/material/paginator'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatSortModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
