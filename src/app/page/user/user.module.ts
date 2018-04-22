import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { SharedModule } from '@app/shared';
import { FoKusDirective } from '@app/fokus.directive';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  declarations: [RegisterComponent, FoKusDirective  ]
})
export class UserModule {
  constructor(){}
}
