import { IAction } from "../../utilities";
import { ETeamAction } from "../utilities";

const initState = { teams: [], myTeam: undefined };

export const teamReducer = (state = initState, action: IAction) => {
    switch (action.type) {
        case ETeamAction.GET_MY_TEAM:
            return {
                ...state,
                myTeam: {...action.value}
            }
        case ETeamAction.GET:
            return {
                ...state,
                teams: [...action.value]
            }
        case ETeamAction.DELETE:
            return {
                ...state,
                myTeam: undefined
            }
        default:
            return state;
    }
}