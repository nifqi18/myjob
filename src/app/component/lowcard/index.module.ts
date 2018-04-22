import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ChildLowonganModule } from './lowongan-module';

@NgModule({
  imports: [
    CommonModule,
    ChildLowonganModule,
  ],
  exports : [ChildLowonganModule]
})
export class LowonganModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LowonganModule,
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: LowonganModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
