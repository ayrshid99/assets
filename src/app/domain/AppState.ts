import { RouterState } from '@ngrx/router-store';

import { LoginState, Dashboard } from "../reducers"
export interface AppState {
  login: LoginState
  dashboard: Dashboard
  router: RouterState
  buildings: [any]
  loading: boolean,
}