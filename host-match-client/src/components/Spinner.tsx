import { connect } from "react-redux";
import { IRootReducerState } from "../store";

export interface IHMSpinnerProps {
  alwaysShow?: boolean;
  showSpinner: boolean;
}

const Spinner = (props: IHMSpinnerProps): JSX.Element => {
  return props.showSpinner || props.alwaysShow ? (
    <div className="spinner-overlay">
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <></>
  );
};

const mapState2Props = (state: IRootReducerState) => {
  return {
    showSpinner: state.global.showSpinner,
  };
};

const HMSpinner = connect(mapState2Props)(Spinner);

export { HMSpinner };
