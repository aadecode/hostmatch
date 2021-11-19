import React from "react";
import { connect } from "react-redux";
import { getTeams } from "../../store/actions/teamsAction";
import { EHMButtonKind, EHMButtonVarient, HMButton } from "../../components";
import { useDebounce } from "../../utilities/common";
import { EViewModes } from "../../utilities/enums";
import {
  EMatchDetailsAction,
  getMatchDetailFields,
  IMatchDetails,
  matchDetailsStateReducer,
} from "./utilities";
import { HMForm, IAttrs } from "../../components/Form";
import { getHMOptions, getInitialMatchDetailsState } from ".";
import {
  createMatchDetails,
  deleteMatch,
} from "../../store/actions/matchActions";
import { HMSearchSelect, IHMOption } from "../../components/SearchSelect";
import { HMHeadline } from "../../components/Headline";
import { displayError } from "../../store/actions/globalActions";
import { ITeam } from "../Teams";
import { Redirect } from "react-router";
import { IRootReducerState } from "../../store";

export interface IMatchDetailsProps {
  viewMode?: string;
  matchDetails: IMatchDetails;
  team?: ITeam;
  _createMatchDetails: (match: IMatchDetails) => void;
  _getMyHostedLiveMatch: (playerId: string) => void;
  _deleteMatch: (id: string) => void;
  _updateMatch: (id: string) => void;
  _getTeams: (searchKey: string) => void;
  _searchPlayer: (searchKey: string) => void;
  _displayError: (message: string) => void;
  playerId: string;
  teams: ITeam[];
}

const MatchDetailsComp = (props: IMatchDetailsProps): JSX.Element | null => {
  const {
    viewMode,
    matchDetails,
    team,
    _createMatchDetails,
    playerId,
    _displayError,
    _deleteMatch,
    _getTeams,
    teams,
  } = { ...props };
  const isMatchHosted: boolean =
    !!matchDetails && matchDetails.id ? true : false;
  const [matchDetailsState, dispatchMatchDetailsState] = React.useReducer(
    matchDetailsStateReducer,
    isMatchHosted
      ? matchDetails
      : getInitialMatchDetailsState(
          (team && team.contact) || "",
          playerId || ""
        )
  );
  const [matchAttrsViewMode, setMatchAttrsViewMode] = React.useState<string>(
    viewMode || EViewModes.CREATE
  );
  const [redirect, setRedirect] = React.useState<Boolean>(false);
  const [teamSearchKey, setTeamSearchKey] = React.useState<string>("");
  const debouncedFunction = useDebounce((searchKey: string) => {
    _getTeams(searchKey);
  });

  React.useEffect(() => {
    debouncedFunction(teamSearchKey);
    return () => {
      debouncedFunction.cancel();
    };
  }, [teamSearchKey]);

  React.useEffect((): void => {
    //playerId && _getMyHostedLiveMatch(playerId);
  }, [playerId]);

  React.useEffect((): void => {
    dispatchMatchDetailsState({
      type: EMatchDetailsAction.SET_MATCH_DETAILS,
      value: isMatchHosted
        ? matchDetails
        : getInitialMatchDetailsState((team && team.contact) || "", playerId),
    });
    if (matchAttrsViewMode === EViewModes.CREATE && isMatchHosted) {
      setMatchAttrsViewMode(EViewModes.READ);
    } else if (matchAttrsViewMode === EViewModes.READ && !isMatchHosted) {
      setMatchAttrsViewMode(EViewModes.CREATE);
    }
  }, [matchDetails, team]);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    if (matchDetailsState.teams[0] && matchDetailsState.teams[1]) {
      _createMatchDetails(matchDetailsState);
      setMatchAttrsViewMode(EViewModes.READ);
      setRedirect(true);
    } else {
      _displayError("Please add 2 teams for this match");
    }
  };

  const setMatchDetailsField = (value: string, action: string): void => {
    dispatchMatchDetailsState({
      type: action,
      value,
    });
  };

  const onAddOption = (value: IHMOption): void => {
    setTeamSearchKey("");
    dispatchMatchDetailsState({
      type: EMatchDetailsAction.ADD_TEAM,
      value: { ...value },
    });
  };

  const onRemoveOption = (value: IHMOption): void => {
    dispatchMatchDetailsState({
      type: EMatchDetailsAction.REMOVE_TEAM,
      value: { ...value },
    });
  };

  const _attrs: IAttrs[] = getMatchDetailFields(
    matchDetailsState,
    setMatchDetailsField
  );

  const displaySelectedTeams = (): React.ReactNode => {
    return matchDetailsState.teams[0]
      ? `${matchDetailsState.teams[0].value} ${
          !!matchDetailsState.teams[1]
            ? "vs " + matchDetailsState.teams[1].value
            : ""
        }`
      : "No teams selected";
  };

  const hmSearchSelectProps = {
    label: "Teams",
    placeholder: "Search team by name",
    required: true,
    fieldKey: "teams",
    onAddOption: onAddOption,
    onRemoveOption: onRemoveOption,
    value: teamSearchKey,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      setTeamSearchKey(event.target.value),
    options: getHMOptions(teams || []),
    hideSearch: matchDetailsState.teams?.length === 2,
    readOnly: isMatchHosted,
  };

  return redirect ? (
    <Redirect to="/hostMatch" />
  ) : (
    <>
      {isMatchHosted && (
        <div className="d-flex justify-content-end mb-1">
          <HMButton
            onClick={(): void => _deleteMatch(matchDetailsState.id || "")}
            kind={EHMButtonKind.DELETE}
          />
        </div>
      )}
      {isMatchHosted && (
        <HMHeadline>
          <>Match details</>
        </HMHeadline>
      )}

      <HMForm
        handleSubmit={handleSubmit}
        attrs={_attrs}
        viewMode={matchAttrsViewMode}
      >
        <>
          <HMSearchSelect
            {...hmSearchSelectProps}
            selectedOptions={matchDetailsState.teams || []}
          >
            <div>{displaySelectedTeams()}</div>
          </HMSearchSelect>
        </>
      </HMForm>

      {isMatchHosted && (
        <>
          <HMButton
            onClick={(): void => {}}
            variant={EHMButtonVarient.PRIMARY}
            className="mb-3"
          >
            Start match
          </HMButton>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: IRootReducerState) => {
  return {
    team: state.team.myTeam,
    teams: state.team.teams,
    //matchDetails: state.matchDetails,
    playerId: state.firebase.auth.uid,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _createMatchDetails: (match: IMatchDetails) => {
      dispatch(createMatchDetails(match));
    },
    // _getMyHostedLiveMatch: (createdBy: string) => {
    //   dispatch(getMyHostedLiveMatch(createdBy));
    // },
    _deleteMatch: (id: string) => {
      dispatch(deleteMatch(id));
    },
    _getTeams: (searchKey: string) => {
      dispatch(getTeams(searchKey));
    },
    _displayError: (message: string) => {
      dispatch(displayError(message));
    },
  };
};

const MyMatchDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchDetailsComp);

export { MyMatchDetails };
