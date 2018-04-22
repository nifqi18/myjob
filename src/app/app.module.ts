import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SettingsModule } from './settings';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageModule } from '@app/page';
import { FullscreenService } from '@app/fullscreen.service';
import { UserapiService } from '@app/service/userapi.service';
import { EventHTTP } from '@app/service/login.service';
import { PostKerja } from '@app/service/postkerja';
import { HttpServices } from '@app/service/httpApi';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '@app/interceptor/interceptor.service';
import { AuthInterceptors } from '@app/interceptor/authservice.service';
import { NgDeepLazyLoad } from '@app/testmodule/lib/ngdeep.service';
import { FoKusDirective } from '@app/fokus.directive';
import { KerjaApi } from '@app/services/kerjaapi.service';
import { PekerjaanService } from '@app/service/pekerjaan.service';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AutocompleteFilterExample } from '@app/page/autocomplete/autocomplete-filter/autocomplete-filter-example';
import { AutocompleteDisplayExample } from '@app/page/autocomplete/autocomplete-display/autocomplete-display-example';
import { AutocompleteAutoActiveFirstOptionExample } from '@app/page/autocomplete/autocomplete-auto-active-first-option/autocomplete-auto-active-first-option-example';
import { AutocompleteDemo } from '@app/page/autocomplete/autocomplete/autocomplete-demo';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    // features
    PageModule,
    SettingsModule,
    //ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),

    // app
    // test demo autocomplete 
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    

    AppRoutingModule
  ],
  declarations: [AppComponent, AutocompleteDemo ,AutocompleteFilterExample, AutocompleteDisplayExample, AutocompleteAutoActiveFirstOptionExample],
  providers: [
    FullscreenService, 
    UserapiService, 
    EventHTTP , 
    PostKerja , 
    HttpServices, 
    NgDeepLazyLoad,
    PekerjaanService,
    KerjaApi,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptors,
      multi: true
    }
  
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
