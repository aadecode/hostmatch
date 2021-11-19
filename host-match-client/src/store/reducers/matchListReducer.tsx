import { IMatchDetails } from "../../pages/HostMatch";
import { IAction } from "../../utilities";
import { EMatchAction } from "../utilities";

export interface IMatchListReducer {
  allMatches: IMatchDetails[];
  myHostedMatches: IMatchDetails[];
  myTeamsMatches: IMatchDetails[];
  currentMatch: IMatchDetails | undefined;
}

const initState: IMatchListReducer = {
  allMatches: [],
  myHostedMatches: [],
  myTeamsMatches: [],
  currentMatch: undefined,
};

export const matchListReducer = (state = initState, action: IAction) => {
  switch (action.type) {
    case EMatchAction.GET_ALL_MATCHES:
      return {
        ...state,
        allMatches: action.value,
      };
    case EMatchAction.GET_MY_HOSTED_MATCHES:
      return {
        ...state,
        myHostedMatches: action.value,
      };
    case EMatchAction.GET_MY_TEAMS_MATCHES:
      return {
        ...state,
        myTeamsMatches: action.value,
      };
    case EMatchAction.SET_CURRENT_MATCH_DETAILS:
      return {
        ...state,
        currentMatch: action.value,
      };
    default:
      return state;
  }
};
