import { EHMNotificationType } from "../../components";
import { IAction } from "../../utilities";
import { EGlobalAction } from "../utilities";

const clearNotification = (): IAction => {
  return {
    type: EGlobalAction.CLEAR_NOTIFICATION,
  };
};

const displayErrorNotificationAndHideSpinner = (message: string): IAction => {
  return {
    type: EGlobalAction.HIDE_SPINNER_AND_SHOW_NOTIFICATION,
    value: {
      type: EHMNotificationType.ERROR,
      message,
    },
  };
};

const displaySuccessNotificationAndHideSpinner = (message: string): IAction => {
  return {
    type: EGlobalAction.HIDE_SPINNER_AND_SHOW_NOTIFICATION,
    value: {
      type: EHMNotificationType.SUCCESS,
      message,
    },
  };
};

const displayError = (message: string): IAction => {
  return displayErrorNotificationAndHideSpinner(message);
};

const toggleSpinner = (value: boolean): IAction => {
  return {
    type: EGlobalAction.SET_SPINNER,
    value,
  };
};

export {
  clearNotification,
  displaySuccessNotificationAndHideSpinner,
  displayErrorNotificationAndHideSpinner,
  toggleSpinner,
  displayError,
};
