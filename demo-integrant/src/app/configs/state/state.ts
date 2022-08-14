import { AuthenticationState } from "src/app/core/authentication/state/authentication.reducer";
import { HomeState } from "src/app/modules/home/state/home.reducer";

export interface MainState {
  home: HomeState,
  authentication: AuthenticationState
}
