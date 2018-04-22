import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from '@app/page/setting/setting.component';

const routes: Routes = [
  <any>{path : '' , component : SettingComponent , fullscreen : true}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
