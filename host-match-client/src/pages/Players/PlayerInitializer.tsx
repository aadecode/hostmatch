import React from "react";
import { connect } from "react-redux";
import {
  getCurrentPlayer,
  saveCurrentPlayer,
} from "../../store/actions/playersAction";
import { getMyTeam } from "../../store/actions/teamsAction";
import { IRootReducerState } from "../../store/reducers/rootReducer";
import { IUserProfie } from "../UserProfile";
import { getCurrentPlayerDetails, IPlayerDetails } from "./utilities";

export interface IHMPlayerListProps {
  _profile: IUserProfie;
  _getCurrentPlayer: (id: string) => void;
  _savePlayer: (player: IPlayerDetails) => void;
  _getMyTeam: (createdById: string) => void;
}

const HMPlayerInit = (props: IHMPlayerListProps): JSX.Element | null => {
  React.useEffect((): void => {
    if (!!props._profile.uid) {
      props._getMyTeam(props._profile.uid);
    }
  }, []);
  React.useEffect((): void => {
    if (!!props._profile.uid) {
      props._getCurrentPlayer(props._profile.uid);
      props._savePlayer(getCurrentPlayerDetails(props._profile));
      props._getMyTeam(props._profile.uid);
    }
  }, [props._profile]);
  return null;
};

const mapStateToProps = (state: IRootReducerState) => {
  return {
    _profile: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _getCurrentPlayer: (id: string) => dispatch(getCurrentPlayer(id)),
    _savePlayer: (player: IPlayerDetails) =>
      dispatch(saveCurrentPlayer(player)),
    _getMyTeam: (createdById: string) => dispatch(getMyTeam(createdById)),
  };
};

const PlayerInitilizer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HMPlayerInit);

export { PlayerInitilizer };
