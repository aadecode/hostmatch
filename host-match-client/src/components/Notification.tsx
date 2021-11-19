import React from "react";
import { connect } from "react-redux";
import { clearNotification } from "../store/actions/globalActions";
import { IRootReducerState } from "../store";

enum EHMNotificationType {
  ERROR = "Error",
  SUCCESS = "Success",
}

export interface IHMNotification {
  show: boolean;
  type?: string;
  message: string;
  clearNotification?: () => void;
}

const COMP_PREFIX: string = "hm-toast";
const NOTIFICAION_DISPLAY_TIME = 5000;

const Notification = (props: IHMNotification): JSX.Element | null => {
  const { type, message, show, clearNotification } = { ...props };
  //const [showNotification, setShowNotification] = React.useState<boolean>(show);
  React.useEffect(() => {
    if (show) {
      var interval = setInterval(() => {
        clearNotification && clearNotification();
      }, NOTIFICAION_DISPLAY_TIME);
    }
    return () => {
      clearInterval(interval);
    };
  }, [show]);
  return show ? (
    <div
      className={`${COMP_PREFIX}-container toast-container position-absolute bottom-0 end-0 p-3`}
    >
      <div
        className={`toast ${show ? "show" : ""} ${type?.toLowerCase()}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">{type}!</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => clearNotification && clearNotification()}
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state: IRootReducerState): IHMNotification => {
  return {
    ...state.global.notification,
  };
};

const mapDispatchToProps = (dispatch: any): { clearNotification: any } => {
  return {
    clearNotification: () => dispatch(clearNotification()),
  };
};

const HMNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export { HMNotification, EHMNotificationType };
