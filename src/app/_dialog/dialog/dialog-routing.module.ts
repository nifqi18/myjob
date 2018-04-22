import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogComponent } from '@app/_dialog/dialog/dialog.component';
import { KerjaComponent } from '@app/_dialog/kerja/kerja.component';

const routes: Routes = [
  { path: '', component: DialogComponent, data: { title: 'Post Lowongan' } },
  { path: 'full/:id', component: KerjaComponent, data: { title: 'Post Lowongan' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogRoutingModule { }
