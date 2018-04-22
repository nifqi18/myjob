import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LowkerviewComponent } from '@app/page/lowkerview/lowkerview.component';

const routes: Routes = [
  { path: '', redirectTo: 'pekerjaan' },
  { path: 'pekerjaan/:id', component: LowkerviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LowkerviewRoutingModule { }
