import { stat } from "fs";
import * as React from "react";
import { connect } from "react-redux";
import { IMatchDetails } from "../HostMatch";
import { EHMButtonKind, HMButton } from "../../components";
import { IRootReducerState } from "../../store";
import {
  deleteMatch,
  getCurrentHostedMatch,
} from "../../store/actions/matchActions";
import { useHistory } from "react-router-dom";

export interface IScoreContainerProps {
  uid: string;
  currentMatch: IMatchDetails | undefined;
  match: { params: { id: string } };
  _getCurrentHostedMatch: (id: string) => void;
  _deleteMatch: (id: string) => void;
}

const ScoreContainerComp = (props: IScoreContainerProps): JSX.Element => {
  const { uid, match, _getCurrentHostedMatch, currentMatch, _deleteMatch } = {
    ...props,
  };
  let history = useHistory();
  const matchId: string = match.params.id;
  React.useEffect(() => {
    _getCurrentHostedMatch(matchId);
  }, []);

  const deletCurrentMatch = (): void => {
    _deleteMatch(matchId);
    history.push("/");
  };
  return currentMatch && currentMatch.title ? (
    <>
      {currentMatch.createdById === uid && (
        <div className="d-flex justify-content-end">
          <HMButton kind={EHMButtonKind.DELETE} onClick={deletCurrentMatch} />
        </div>
      )}
      <div>
        {currentMatch.teams[0].value} vs {currentMatch.teams[1].value}
      </div>
      {currentMatch.createdById === uid && (
        <HMButton to={`/hostMatch/${matchId}`} kind={EHMButtonKind.LINK}>
          Start match!
        </HMButton>
      )}
    </>
  ) : (
    <>Match data unavailable!</>
  );
};

const mapState2Props = (state: IRootReducerState) => {
  return {
    uid: state.firebase.auth.uid,
    currentMatch: state.matchList.currentMatch,
  };
};

const mapDispatch2Props = (dispatch: any) => {
  return {
    _getCurrentHostedMatch: (id: string) => {
      dispatch(getCurrentHostedMatch(id));
    },
    _deleteMatch: (id: string) => {
      dispatch(deleteMatch(id));
    },
  };
};

const ScoreContainer = connect(
  mapState2Props,
  mapDispatch2Props
)(ScoreContainerComp);

export { ScoreContainer };
