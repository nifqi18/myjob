import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { AUTH_KEY, AuthActionTypes } from './auth.reducer';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  login(): Observable<Action> {
    return this.actions$
      .ofType(AuthActionTypes.LOGIN)
      .pipe(
        tap((action:any) =>
          this.localStorageService.setItem(AUTH_KEY, { Store: action.payload })
        )
      );
  }

  @Effect({ dispatch: false })
  logout(): Observable<Action> {
    return this.actions$.ofType(AuthActionTypes.LOGOUT).pipe(
      tap((action:any) => {
        this.router.navigate(['']);
        this.localStorageService.setItem(AUTH_KEY, { Store: action.payload });
      })
    );
  }

  @Effect({ dispatch: false })
  SaveUserId(): Observable<Action> {
    return this.actions$.ofType(AuthActionTypes.SAVE).pipe(
      tap((action:any) => {
        this.router.navigate(['']);
        console.log(action);
        this.localStorageService.setItem('userid', { Store: action.payload });
      })
    );
  }
}
