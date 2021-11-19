import { displayErrorNotificationAndHideSpinner, toggleSpinner } from ".";
import { IPlayerDetails } from "../../pages/Players/utilities";
import { IUserProfie } from "../../pages/UserProfile";
import { IDispatch, IGetState, IFirebaseActionDispatcher } from "../../utilities";
import { ECollections, EPlayerAction, ETeamAction } from "../utilities";
import { createDoc, deleteDoc, formatSnapshot, getDocById, getDocs, setDoc, updateDoc } from "../utilities/firestoreService";

const getCurrentPlayer = (id: string): IFirebaseActionDispatcher => {
    return (dispatch: IDispatch, getState: IGetState) => {
        dispatch(toggleSpinner(true));
        getDocById(ECollections.PLAYERS, id).onSnapshot((snapshot: any) => {
            const data = formatSnapshot(snapshot);
            dispatch({
                type: EPlayerAction.GET_CURRENT_PLAYER,
                value: data
            });
            dispatch(toggleSpinner(false));
        });
    }
};

const getPlayerList = (): IFirebaseActionDispatcher => {
    return (dispatch: IDispatch, getState: IGetState) => {
        dispatch(toggleSpinner(true));
        getDocs(ECollections.PLAYERS).onSnapshot((snapshot: any) => {
            const data = formatSnapshot(snapshot);
            dispatch({
                type: EPlayerAction.GET,
                value: data
            });
            dispatch(toggleSpinner(false));
        });
    }
};

const saveCurrentPlayer = (player: IPlayerDetails) => {
    return (dispatch: IDispatch, getState: IGetState): void => {
        dispatch(toggleSpinner(true));
        setDoc(ECollections.PLAYERS, player).then(() => {
            dispatch(toggleSpinner(false));
        }).catch((err: Error) => {
            dispatch(displayErrorNotificationAndHideSpinner(err.message));
        });
    }
}

export { getCurrentPlayer, saveCurrentPlayer, getPlayerList };