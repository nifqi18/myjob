import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from '@app/page/about/about.component';

const routes: Routes = [
  { path: 'about', component : AboutComponent , data : {title : 'Home'} },
  { path: 'pekerjaan', loadChildren: '@app/page/pekerjaan/pekerjaan.module#PekerjaanModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
