import { stat } from "fs";
import * as React from "react";
import { connect } from "react-redux";
import { IMatchDetails } from "../HostMatch";
import { HMModal } from "../../components";
import { EAlertType, HMAlert } from "../../components/Alert";
import { IRootReducerState } from "../../store";
//import { getCurrentHostedMatch } from "../../store/actions/hostActions";
import { ITeam } from "../Teams";
import { Squad } from "./squad";

export interface IHostViewProps {
  currentMatch: IMatchDetails | undefined;
  match: { params: { id: string } };
  _getCurrentHostedMatch: (id: string) => void;
}

const HostViewComp = (props: IHostViewProps): JSX.Element => {
  const { match, _getCurrentHostedMatch, currentMatch } = { ...props };
  React.useEffect(() => {
    console.log("orps ", match.params.id);
    _getCurrentHostedMatch(match.params.id);
  }, []);
  return currentMatch && currentMatch.title ? (
    <HMModal show={true} hideHeader={true}>
      <>
        Host view {currentMatch.title}
        <Squad />
      </>
    </HMModal>
  ) : (
    <HMAlert type={EAlertType.INFO}>
      <>No hosted match!</>
    </HMAlert>
  );
};

const mapState2Props = (state: IRootReducerState) => {
  return {
    currentMatch: state.matchList.currentMatch,
  };
};

const mapDispatch2Props = (dispatch: any) => {
  return {
    _getCurrentHostedMatch: (id: string) => {
      //dispatch(getCurrentHostedMatch(id));
    },
  };
};

const HostView = connect(mapState2Props, mapDispatch2Props)(HostViewComp);

export { HostView };
