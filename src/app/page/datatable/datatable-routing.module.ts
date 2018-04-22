import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatatableComponent } from '@app/page/datatable/datatable.component';

const routes: Routes = [
  {path :'' , component : DatatableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatatableRoutingModule { }
