import * as React from "react";
import { connect } from "react-redux";
import { HMSearchSelect } from "../../components/SearchSelect";
import { IRootReducerState } from "../../store";
import { IPlayerDetails } from "../Players/utilities";
import { getPlayersAsOptions } from "./utilities";

export interface ISquadCompProps {
  players: IPlayerDetails[];
}

const SquadComp = (props: ISquadCompProps): JSX.Element => {
  const { players } = { ...props };
  return (
    <>
      <div>Select squad</div>
      <HMSearchSelect
        label="players"
        fieldKey="team1Players"
        options={getPlayersAsOptions(players)}
      />
    </>
  );
};

const mapState2Props = (state: IRootReducerState) => {
  return {
    players: state.player.players,
  };
};

const Squad = connect(mapState2Props)(SquadComp);

export { Squad };
