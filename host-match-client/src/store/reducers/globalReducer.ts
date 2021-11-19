import { EHMNotificationType, IHMNotification } from "../../components";
import { IAction } from "../../utilities";
import { EGlobalAction } from "../utilities";

export interface IGlobalReducer {
    showSpinner: boolean;
    notification: IHMNotification;
}

const initState: IGlobalReducer = {
    showSpinner: false,
    notification: {
        show: false,
        message: 'Operation was successfull!'
    }
};

export const globalReducer = (state = initState, action: IAction) => {
    switch (action.type) {
        case EGlobalAction.SET_SPINNER:
            return {
                ...state,
                showSpinner: action.value
            };
        case EGlobalAction.HIDE_SPINNER_AND_SHOW_NOTIFICATION:
            return {
                ...state,
                showSpinner: false,
                notification: {
                    show: true,
                    type: action.value.type || EHMNotificationType.SUCCESS,
                    message: action.value.message || 'Operation was successfull!'
                }
            };
        case EGlobalAction.CLEAR_NOTIFICATION:
            return {
                ...state,
                notification: {
                    show: false
                }
            }
        default:
            return state;
    }
}