import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as HomeActions from './home.action';



export interface HomeState {
  ToggleAgGrid: boolean;
}

const initialState: HomeState = {
  ToggleAgGrid: true,
}

const getHomeFeatureState = createFeatureSelector<HomeState>('home');

export const getToggleAgGrid = createSelector(
  getHomeFeatureState,
  state => state.ToggleAgGrid
)



export const homeReducer = createReducer(
  initialState,
  on(HomeActions.ToggleAgGrid, (state): HomeState => {
    return {
      ...state,
      ToggleAgGrid: !state.ToggleAgGrid
    }
  })
);
