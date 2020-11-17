import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTO_LOGOUT = '[Auth] Auto Logout';
export const SIGNUP_START = '[Auth] Signup Start';

export const AUTH_FAILED = '[Auth] Auth Failed';
export const AUTH_SUCCESS = '[Auth] Auth Success';

export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear Error';

export class AuthSuccess implements Action {
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: Boolean;
    }
  ) {}
  readonly type = AUTH_SUCCESS;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthFailed implements Action {
  readonly type = AUTH_FAILED;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class AutoLogout implements Action {
  readonly type = AUTO_LOGOUT;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActionsType =
  | LoginStart
  | SignupStart
  | Logout
  | ClearError
  | AuthSuccess
  | AutoLogin
  | AutoLogout
  | AuthFailed;
