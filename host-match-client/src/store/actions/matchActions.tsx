import {
  displayErrorNotificationAndHideSpinner,
  displaySuccessNotificationAndHideSpinner,
  toggleSpinner,
} from ".";
import { IHMOption } from "../../components/SearchSelect";
import { EMatchStatus, IMatchDetails } from "../../pages/HostMatch";
import {
  IDispatch,
  IGetState,
  IFirebaseActionDispatcher,
} from "../../utilities";
import { ECollections, EMatchAction, ENotificationAction } from "../utilities";
import {
  createDoc,
  deleteDoc,
  formatSnapshot,
  getDocBy2Fields,
  getDocByField,
  getDocById,
  getDocs,
} from "../utilities/firestoreService";

const createMatchDetails = (match: IMatchDetails) => {
  return (dispatch: IDispatch, getState: IGetState): void => {
    dispatch(toggleSpinner(true));
    createDoc(ECollections.MATCH_DETAILS, match)
      .then(() => {
        dispatch(
          displaySuccessNotificationAndHideSpinner(
            `Match ${match.title} is now hosted...`
          )
        );
      })
      .catch((err: Error) => {
        dispatch(displayErrorNotificationAndHideSpinner(err.message));
      });
  };
};

const getAllHostedMatches = (uid: string): IFirebaseActionDispatcher | void => {
  return (dispatch: IDispatch, getState: IGetState) => {
    dispatch(toggleSpinner(true));
    getDocByField(ECollections.MATCH_DETAILS, {
      fieldPath: "createdById",
      opStr: "==",
      value: uid,
    }).onSnapshot((snapshot: any) => {
      const data = formatSnapshot(snapshot);
      dispatch({
        type: EMatchAction.GET_MY_HOSTED_MATCHES,
        value: data,
      });
      dispatch(toggleSpinner(false));
    });
  };
};

const getAllMatches = (): IFirebaseActionDispatcher | void => {
  return (dispatch: IDispatch, getState: IGetState) => {
    dispatch(toggleSpinner(true));
    getDocs(ECollections.MATCH_DETAILS).onSnapshot((snapshot: any) => {
      const data = formatSnapshot(snapshot);
      dispatch({
        type: EMatchAction.GET_ALL_MATCHES,
        value: data,
      });
      dispatch(toggleSpinner(false));
    });
  };
};

const getMyTeamsMatches = (
  team: IHMOption
): IFirebaseActionDispatcher | void => {
  return (dispatch: IDispatch, getState: IGetState) => {
    dispatch(toggleSpinner(true));
    getDocByField(ECollections.MATCH_DETAILS, {
      fieldPath: "teams",
      opStr: "array-contains",
      value: { key: team.key, value: team.value },
    }).onSnapshot((snapshot: any) => {
      const data = formatSnapshot(snapshot);
      dispatch({
        type: EMatchAction.GET_MY_TEAMS_MATCHES,
        value: data,
      });
      dispatch(toggleSpinner(false));
    });
  };
};

const getMyHostedLiveMatch = (
  uid: string
): IFirebaseActionDispatcher | void => {
  return (dispatch: IDispatch, getState: IGetState) => {
    dispatch(toggleSpinner(true));
    getDocBy2Fields(
      ECollections.MATCH_DETAILS,
      { fieldPath: "createdById", opStr: "==", value: uid },
      { fieldPath: "status", opStr: "==", value: EMatchStatus.LIVE }
    ).onSnapshot((snapshot: any) => {
      const data = formatSnapshot(snapshot);
      dispatch({
        type: EMatchAction.GET_MY_MATCH_DETAILS,
        value: data[0],
      });
      dispatch(toggleSpinner(false));
    });
  };
};

const deleteMatch = (id: string): IFirebaseActionDispatcher => {
  return (dispatch: IDispatch, getState: IGetState) => {
    dispatch(toggleSpinner(true));
    deleteDoc(ECollections.MATCH_DETAILS, id)
      .then((resp) => {
        dispatch(displaySuccessNotificationAndHideSpinner("Match deleted!"));
      })
      .catch((err: Error) => {
        displayErrorNotificationAndHideSpinner(err.message);
      });
  };
};

const getMatches = (searchKey: string): IFirebaseActionDispatcher => {
  return (dispatch: IDispatch, getState: IGetState) => {
    getDocs(ECollections.MATCH_DETAILS).onSnapshot((snapshot: any) => {
      const data = formatSnapshot(snapshot);
      dispatch({
        type: EMatchAction.GET_MATCHES,
        value: data,
      });
    });
  };
};

const getCurrentHostedMatch = (
  id: string
): IFirebaseActionDispatcher | void => {
  return (dispatch: IDispatch) => {
    dispatch(toggleSpinner(true));
    getDocById(ECollections.MATCH_DETAILS, id).onSnapshot((snapshot: any) => {
      const data = formatSnapshot(snapshot);
      dispatch({
        type: EMatchAction.SET_CURRENT_MATCH_DETAILS,
        value: data,
      });
      dispatch(toggleSpinner(false));
    });
  };
};

export {
  createMatchDetails,
  getMyHostedLiveMatch,
  deleteMatch,
  getMatches,
  getAllMatches,
  getAllHostedMatches,
  getMyTeamsMatches,
  getCurrentHostedMatch,
};
