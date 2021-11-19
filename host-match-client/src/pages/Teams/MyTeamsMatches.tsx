import { title } from "process";
import * as React from "react";
import { connect } from "react-redux";
import {
  getAllMatches,
  getMyTeamsMatches,
} from "../../store/actions/matchActions";
import { IRootReducerState } from "../../store";
import { IMatchDetails } from "../HostMatch";
import { MatchListItems } from "../Matches/MatchListItems";
import { IHMOption } from "../../components/SearchSelect";
import { ITeam } from ".";

export interface IMatchListProps {
  myTeam: ITeam;
  myTeamsMatches: IMatchDetails[];
  _getMyTeamsMatches: (team: IHMOption) => void;
}

const MyTeamsMatchesComp = (props: IMatchListProps) => {
  const { myTeam, _getMyTeamsMatches, myTeamsMatches } = { ...props };
  React.useEffect(() => {
    !!myTeam &&
      !!myTeam.id &&
      _getMyTeamsMatches({
        key: myTeam.id,
        value: myTeam.name,
      });
  }, [myTeam]);
  return <MatchListItems matches={myTeamsMatches || []} />;
};

const mapStateToProps = (state: IRootReducerState) => {
  return {
    myTeam: state.team.myTeam,
    myTeamsMatches: state.matchList.myTeamsMatches,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _getMyTeamsMatches: (team: IHMOption) => {
      dispatch(getMyTeamsMatches(team));
    },
  };
};

const MyTeamsMatches = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTeamsMatchesComp);

export { MyTeamsMatches };
