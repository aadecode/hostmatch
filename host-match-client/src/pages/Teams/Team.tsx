import React from "react";
import { connect } from "react-redux";
import {
  createTeam,
  deleteTeam,
  getMyTeam,
  updateTeam,
} from "../../store/actions/teamsAction";
import {
  createTeamReducer,
  ECreateTeamAction,
  getTeamFields,
  ICreateTeam,
  ITeam,
  MyTeamsMatches,
  TeamDetails,
} from ".";
import { EViewModes } from "../../utilities/enums";
import { HMTabs } from "../../components/HMTabs";
import { useHistory, useLocation } from "react-router";
import { IRootReducerState } from "../../store";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export interface ICreateTeamProps {
  _createTeam: ICreateTeam;
  _createdByName: string;
  _createdById: string;
  myTeam?: ITeam;
  _getMyTeam: (uid: string) => void;
  viewMode: string;
  _deleteMyTeam: (id: string) => void;
  _updateTeam: (team: ITeam) => void;
}

const MyTeamComp = (props: ICreateTeamProps): JSX.Element | null => {
  const {
    _createTeam,
    _createdById,
    _createdByName,
    _getMyTeam,
    myTeam,
    _deleteMyTeam,
    _updateTeam,
  } = { ...props };

  const initialTeamState = {
    name: "",
    contact: "",
    address: "",
    createdById: _createdById,
    createdByName: _createdByName,
  };

  const [team, dispatchTeam] = React.useReducer(
    createTeamReducer,
    myTeam && myTeam.id ? myTeam : (initialTeamState as ITeam)
  );
  const selectedTab: string | null = useQuery().get("tab");
  const history: any = useHistory();

  React.useEffect((): void => {
    dispatchTeam({
      type: ECreateTeamAction.SET_TEAM,
      value: myTeam && myTeam.id ? myTeam : initialTeamState,
    });
  }, [myTeam]);

  const handleSubmit = (e: any, mode: string): void => {
    e.preventDefault();
    mode === EViewModes.EDIT ? _updateTeam(team) : _createTeam(team);
  };

  const deleteTeam = (): void => {
    if (!myTeam) return;
    _deleteMyTeam(myTeam.id);
  };

  const setTeamField = (value: string, action: string): void => {
    dispatchTeam({
      type: action,
      value,
    });
  };

  const getTeamDetailsComponent = () => {
    return (
      <TeamDetails
        myTeam={myTeam}
        attrs={getTeamFields(team, setTeamField)}
        handleSubmit={handleSubmit}
        deleteTeam={deleteTeam}
      />
    );
  };

  return (
    <HMTabs
      tabs={[
        {
          title: "Details",
          key: "details",
          component: getTeamDetailsComponent(),
        },
        {
          title: "players",
          key: "Players",
          component: <div>Players</div>,
        },
        {
          title: "matches",
          key: "Matches",
          component: <MyTeamsMatches />,
        },
      ]}
      onSelect={(e: any) => history.push(`/myTeam?tab=${e}`)}
      selectedTab={selectedTab}
    />
  );
};

const mapStateToProps = (state: IRootReducerState) => {
  return {
    _createdByName: state.firebase.auth.displayName,
    _createdById: state.firebase.auth.uid,
    myTeam: state.team.myTeam,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _createTeam: (team: ITeam) => {
      dispatch(createTeam(team));
    },
    _getMyTeam: (uid: string) => {
      dispatch(getMyTeam(uid));
    },
    _deleteMyTeam: (id: string) => {
      dispatch(deleteTeam(id));
    },
    _updateTeam: (team: ITeam) => {
      dispatch(updateTeam(team));
    },
  };
};

const MyTeam = connect(mapStateToProps, mapDispatchToProps)(MyTeamComp);

export { MyTeam };
