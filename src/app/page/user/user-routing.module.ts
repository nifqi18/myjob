import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/page/user/login.component';
import { RegisterComponent } from '@app/page/user/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent , data : { title : 'Silahkan login terlebih dahulu'} },
  { path: 'register', component: RegisterComponent, data : { title : 'Registrasikan diri anda'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
  constructor() { }
}
