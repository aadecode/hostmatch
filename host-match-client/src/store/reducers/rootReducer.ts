import { authReducer } from "./authReducer";
import { teamReducer } from "./teamsReducer";
import { combineReducers } from "redux";
import { firebaseReducer, firestoreReducer } from 'react-redux-firebase';
import { playerReducer } from "./playerReducer";
import { IMatchListReducer, matchListReducer } from "./matchListReducer";
import { hostReducer, IHostViewReducer } from "./hostReducer";
import { ITeam } from "../../pages/Teams";
import { IUserProfie } from "../../pages/UserProfile";
import { IHMNotification } from "../../components";
import { IPlayerDetails } from "../../pages/Players/utilities";
import { IMatchData } from "../../pages/HostMatch";
import { globalReducer, IGlobalReducer } from "./globalReducer";

export interface IRootReducerState {
  auth: any;
  team: {
    teams: ITeam[];
    myTeam: ITeam;
  };
  firebase: {
    auth: IUserProfie;
  };
  player: {
    players: IPlayerDetails[];
    currentPlayer: IPlayerDetails;
  };
  matchList: IMatchListReducer;
  hostView: IHostViewReducer;
  global: IGlobalReducer;
}

export const rootReducer = combineReducers({
    auth: authReducer,
    team: teamReducer,
    firebase: firebaseReducer,
    //firestore: firestoreReducer,
    player: playerReducer,
    matchList: matchListReducer,
    hostView: hostReducer,
    global: globalReducer
});