import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
   
  ],
  declarations : [],
  providers : []
})
export class PrivateModule {
  constructor(){}
}
