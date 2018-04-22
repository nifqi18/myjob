import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings';
import { AuthGuardService } from '@app/core';
import { AutocompleteAutoActiveFirstOptionExample } from '@app/page/autocomplete/autocomplete-auto-active-first-option/autocomplete-auto-active-first-option-example';
import { AutocompleteDisplayExample } from '@app/page/autocomplete/autocomplete-display/autocomplete-display-example';
import { AutocompleteFilterExample } from '@app/page/autocomplete/autocomplete-filter/autocomplete-filter-example';
import { AutocompleteDemo } from '@app/page/autocomplete/autocomplete/autocomplete-demo';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      title: 'Settings'
    }
  },
  {
    path: 'examples',
    loadChildren: 'app/examples/examples.module#ExamplesModule'
  },
  {
    path: 'v1',
    loadChildren: '@app/_dialog/private.module#PrivateModule'
  },
  {
    path: 'auth',
    loadChildren: '@app/page/user/user.module#UserModule',
    canActivate : [AuthGuardService]
  },
  {
    path: 'home',
    loadChildren: '@app/page/home/home.module#HomeModule'
  },
  {
    path: 'auto1',
    component: AutocompleteAutoActiveFirstOptionExample
    //loadChildren: '@app/page/datatable/datatable.module#DatatableModule'
  },
  {
    path: 'auto2',
    component: AutocompleteDisplayExample
    //loadChildren: '@app/page/datatable/datatable.module#DatatableModule'
  },
  {
    path: 'auto3',
    component: AutocompleteDemo
    //loadChildren: '@app/page/datatable/datatable.module#DatatableModule'
  },
  {
    path : 'search/:id',
    loadChildren : '@app/page/search/search.module#SearchModule'
  },
  {
    path : 'view',
    loadChildren: '@app/page/lowkerview/lowkerview.module#LowkerviewModule'
  },
  {
    path : 'profile',
    loadChildren: '@app/page/profile/profile.module#ProfileModule',
    canActivate: [AuthGuardService]
  },
  {
    path : 'setting',
    loadChildren: '@app/page/setting/setting.module#SettingModule',
    canActivate: [AuthGuardService]
  },
 


  {
    path: '**',
    redirectTo: 'about'
  }



];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
