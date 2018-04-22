import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KerjaComponent } from '@app/_dialog/kerja/kerja.component';

const routes: Routes = [
  { path : 'postkerja' , loadChildren : '@app/_dialog/dialog/dialog.module#DialogModule'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PrivateRoutingModule { }
