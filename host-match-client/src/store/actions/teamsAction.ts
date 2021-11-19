import { displayErrorNotificationAndHideSpinner, displaySuccessNotificationAndHideSpinner, toggleSpinner } from ".";
import { ECreateTeamAction, ITeam } from "../../pages/Teams";
import { IDispatch, IError, IFirebaseActionDispatcher, IFirebaseExtraArgs, IFireStore, IGetState, IResponseData } from "../../utilities";
import { ECollections, ECommonAction, ENotificationAction, ETeamAction } from "../utilities";
import { createDoc, deleteDoc, formatSnapshot, getDocByField, getDocs, ISearchArgs, updateDoc } from "../utilities/firestoreService";

const createTeam = (team: ITeam): IFirebaseActionDispatcher => {
    return (dispatch: IDispatch, getState: IGetState): void => {
        dispatch(toggleSpinner(true));
        const _team = {...team, searchKey: team.name.toLocaleLowerCase()};
        createDoc(ECollections.TEAMS, _team).then(() => {
            dispatch(displaySuccessNotificationAndHideSpinner(`Team ${team.name} successfully created...`));
        }).catch((err: Error) => {
            dispatch(displayErrorNotificationAndHideSpinner(`${err.message}`));
        });
    }
}

const getTeams = (searchKey?: string): IFirebaseActionDispatcher => {
    return (dispatch: IDispatch, getState: IGetState) => {
        dispatch(toggleSpinner(true));
        const searchArgs: ISearchArgs | undefined = typeof searchKey !== 'undefined' ? {value: searchKey} : undefined;
        getDocs(ECollections.TEAMS, searchArgs).onSnapshot((snapshot: any) => {
            const data = formatSnapshot(snapshot);
           dispatch({
                type: ETeamAction.GET,
                value: [...data]
            });
            dispatch(toggleSpinner(false));
        });
    }
}

const getMyTeam = (uid: string): IFirebaseActionDispatcher => {
    return (dispatch: IDispatch, getState: IGetState) => {
        dispatch(toggleSpinner(true));
        getDocByField(ECollections.TEAMS, { fieldPath: 'createdById', opStr: '==', value: uid}).onSnapshot((snapshot: any) => {
            const data = formatSnapshot(snapshot);
            
            dispatch({
                type: ETeamAction.GET_MY_TEAM,
                value: data[0]
            });
            dispatch(toggleSpinner(false));
        });
    }
};

const deleteTeam = (id: string): IFirebaseActionDispatcher => {
    return (dispatch: IDispatch, getState: IGetState, { getFirestore }: IFirebaseExtraArgs) => {
        dispatch(toggleSpinner(true));
        deleteDoc(ECollections.TEAMS, id).then((resp) => {
            dispatch({
                type: ETeamAction.DELETE
            })
            dispatch(displaySuccessNotificationAndHideSpinner(`Team deleted`));
        }).catch((err: Error) => {
            displayErrorNotificationAndHideSpinner(`${err.message}`);
        });
    }
};

const updateTeam = (team: ITeam): IFirebaseActionDispatcher => {
    return (dispatch: IDispatch, getState: IGetState, { getFirestore }: IFirebaseExtraArgs) => {
        dispatch(toggleSpinner(true));
        const _team = {...team, searchKey: team.name.toLocaleLowerCase()};
        updateDoc(ECollections.TEAMS, team.id, _team).then((resp) => {
            dispatch(displaySuccessNotificationAndHideSpinner(`Team ${team.name} successfully updated...`));
        }).catch((err: Error) => {
            displayErrorNotificationAndHideSpinner(`${err.message}`);
        });
    }
};

export { getTeams, createTeam, getMyTeam, deleteTeam, updateTeam };