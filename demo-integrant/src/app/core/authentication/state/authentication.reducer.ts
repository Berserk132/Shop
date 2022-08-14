import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AuthenticationActions from './authentication.action'

export interface AuthenticationState {
  ToggleSendCatalog: boolean;
}

const initialState: AuthenticationState = {
  ToggleSendCatalog: false,
}


const getAuthenticationFeatureState = createFeatureSelector<AuthenticationState>('authentication');

export const getToggleSendCatalog = createSelector(
  getAuthenticationFeatureState,
  (state) => state.ToggleSendCatalog
);


export const authenticationReducer = createReducer(
  initialState,
  on(AuthenticationActions.ToggleSendCatalog, (state): AuthenticationState => {
    return {
      ...state,
      ToggleSendCatalog: !state.ToggleSendCatalog
    }
  })
);
