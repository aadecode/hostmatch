import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IMatchDetails } from ".";
import { EAlertType, HMAlert } from "../../components/Alert";
import { IRootReducerState } from "../../store";
import { getAllHostedMatches } from "../../store/actions/matchActions";
import { MatchListItems } from "../Matches/MatchListItems";

export interface IHostedMatchesProps {
  myHostedMatches: IMatchDetails[];
  uid: string;
  _getAllHostedMatches: (uid: string) => void;
}

const HostedMatchesComp = (props: IHostedMatchesProps): JSX.Element => {
  const { _getAllHostedMatches, myHostedMatches, uid } = { ...props };
  React.useEffect(() => {
    _getAllHostedMatches(uid);
  }, []);
  return (
    <>
      <HMAlert>
        <span>
          Click <Link to="hostMatch/match">here</Link> to create a new match!
        </span>
      </HMAlert>
      {myHostedMatches.length ? (
        <MatchListItems matches={myHostedMatches || []} />
      ) : (
        <HMAlert type={EAlertType.INFO}>
          <>You are not hosting any match yet!</>
        </HMAlert>
      )}
    </>
  );
};

const mapStateToProps = (state: IRootReducerState) => {
  return {
    uid: state.firebase.auth.uid,
    myHostedMatches: state.matchList.myHostedMatches,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _getAllHostedMatches: (uid: string) => {
      dispatch(getAllHostedMatches(uid));
    },
  };
};

const HostedMatches = connect(
  mapStateToProps,
  mapDispatchToProps
)(HostedMatchesComp);

export { HostedMatches };
