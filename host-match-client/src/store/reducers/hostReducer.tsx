import { IMatchData, IMatchDetails } from "../../pages/HostMatch";
import { IAction } from "../../utilities";
import { EHostAction } from "../utilities";

export interface IHostViewReducer {
  //currentMatchDetails: IMatchDetails | undefined;
}

const initState: IHostViewReducer = {
  //currentMatchDetails: undefined,
};

export const hostReducer = (
  state: IHostViewReducer = initState,
  action: IAction
): IHostViewReducer => {
  switch (action.type) {
    // case EHostAction.SET_CURRENT_MATCH_DETAILS:
    //   return {
    //     ...state,
    //     currentMatchDetails: action.value,
    //   };
    default:
      return state;
  }
};
