import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { createTeam, getTeams } from "../../store/actions/teamsAction";
import { IHTMTeamListProps, ITeam } from ".";
import { MyTeam } from "./Team";
import { HMListItem } from "../../components/ListIttem";
import { IRootReducerState } from "../../store";
import { EViewModes } from "../../utilities/enums";
import { HMAlert } from "../../components/Alert";

const HMTeamList = (props: IHTMTeamListProps): JSX.Element => {
  const { teams, _getTeams, uid } = { ...props };
  React.useEffect((): void => {
    _getTeams();
  }, []);

  return (
    <>
      <div className="list-group">
        {teams.map((team: ITeam): JSX.Element => {
          return (
            <HMListItem
              key={team.id}
              itemId={team.id}
              title={team.name}
              location={team.address}
              subTitle={`created by ${team.createdByName}`}
            />
          );
        })}
      </div>
    </>
  );
};

const mapStateToProps = (state: IRootReducerState) => {
  return {
    uid: state.firebase.auth.uid,
    teams: state.team.teams,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _getTeams: () => dispatch(getTeams()),
  };
};

const TeamList: any = compose<any>(
  connect(mapStateToProps, mapDispatchToProps)
)(HMTeamList);
export { TeamList };
