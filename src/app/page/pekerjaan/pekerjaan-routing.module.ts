import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PekerjaanComponent } from '@app/page/pekerjaan/pekerjaan.component';

const routes: Routes = [
  { path : '' , component : PekerjaanComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PekerjaanRoutingModule { }
