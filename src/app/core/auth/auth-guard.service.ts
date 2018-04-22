import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectorAuth } from './auth.reducer';

@Injectable()
export class AuthGuardService implements CanActivate {

  isAuthenticated = false;

  constructor(private store: Store<any>, private route: Router) {
    this.store
      .select(selectorAuth)
      .subscribe((auth: any) => {
        if (typeof auth.Store !== 'undefined') {
          if (auth.Store.token !== '') {
            return this.isAuthenticated = true;
          }
        }
        return this.isAuthenticated = false;
      })
    //
    //.subscribe(auth => (this.isAuthenticated = auth.isAuthenticated));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isAuthenticated) {
      this.route.navigate(['/pekerjaan']);
      return this.isAuthenticated;
    }

    if (state.url == '/auth/login') return true;
    if (state.url == '/auth/register') return true;
    
    this.route.navigateByUrl('/auth/login');
    return false;

  }

  canActivateA(): boolean {
    return this.isAuthenticated;
  }
}
