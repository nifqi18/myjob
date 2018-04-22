import { Action } from '@ngrx/store';

export const AUTH_KEY = 'AUTH';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout',
  SAVE = '[Auth] CurrentUser'
}

export class ActionAuthUser implements Action {
  constructor(public payload) { }
  readonly type = AuthActionTypes.SAVE;
}

export class ActionAuthLogin implements Action {
  constructor(public payload) { }
  readonly type = AuthActionTypes.LOGIN;
}

export class ActionAuthLogout implements Action {
  constructor(public payload) { }
  readonly type = AuthActionTypes.LOGOUT;
}

export type AuthActions =  ActionAuthLogout | ActionAuthLogin | ActionAuthUser;

export const myInitialState: Auth = {
  Store: {
    token: '',
    type:'',
  }
}

export const selectorAuth = state => state.auth;

export function authReducer(
  state: Auth = myInitialState,
  action: AuthActions
): Auth {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, Store: action.payload }
    case AuthActionTypes.LOGOUT:
      return { ...state, Store: { token : '' , type : '' } }
    case AuthActionTypes.SAVE:
      return { ...state, Store: action.payload }

    default:
      return state;
  }
}



export type UserStore = {
 token : string,
 type : string
}

export interface Auth {
  Store: UserStore
}
