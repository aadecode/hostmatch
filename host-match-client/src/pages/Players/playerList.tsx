import React from "react";
import { connect } from "react-redux";
import { HMListItem } from "../../components/ListIttem";
import { getPlayerList } from "../../store/actions/playersAction";
import { IRootReducerState } from "../../store";
import { IPlayerDetails } from "./utilities";

export interface IHMPlayerListProps {
  _players: IPlayerDetails[];
  _getPlayers: () => void;
}

const HMPlayerList = (props: IHMPlayerListProps): JSX.Element => {
  const { _players, _getPlayers } = { ...props };
  React.useEffect((): void => {
    _getPlayers();
  }, []);
  return (
    <div className="list-group player-list">
      {_players.map((player: IPlayerDetails) => {
        return (
          <HMListItem itemId={player.id} key={player.id}>
            <div className="row align-items-center">
              <div className="col-2 d-flex justify-content-center">
                {!!player.photoURL ? (
                  <img alt="" src={player.photoURL} />
                ) : (
                  <i className="fas fa-user list-item-image"></i>
                )}
              </div>
              <div className="col-10">
                <h5>{player.displayName}</h5>
              </div>
            </div>
          </HMListItem>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: IRootReducerState) => {
  return {
    _players: state.player.players,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _getPlayers: () => dispatch(getPlayerList()),
  };
};

const PlayerList = connect(mapStateToProps, mapDispatchToProps)(HMPlayerList);

export { PlayerList };
