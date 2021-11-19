import { ITeam } from "../../pages/Teams";
import { IAction } from "../../utilities";
import { EPlayerAction, ETeamAction } from "../utilities";

const initState = { players: [], currentPlayer: undefined };

export const playerReducer = (state = initState, action: IAction) => {
    switch (action.type) {
        case EPlayerAction.GET:
            return {
                ...state,
                players: action.value
            }
        case EPlayerAction.GET_CURRENT_PLAYER:
            return {
                ...state,
                currentPlayer: action.value
            }
        default:
            return state;
    }
}