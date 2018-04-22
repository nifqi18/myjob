import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDeepLazyLoad } from '@app/testmodule/lib/ngdeep.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [NgDeepLazyLoad]
})
export class TestModule { }
