import { title } from "process";
import * as React from "react";
import { connect } from "react-redux";
import { getAllMatches } from "../../store/actions/matchActions";
import { IRootReducerState } from "../../store";
import { IMatchDetails } from "../HostMatch";
import { MatchListItems } from "./MatchListItems";
import { EAlertType, HMAlert } from "../../components/Alert";

export interface IMatchListProps {
  allMatches: IMatchDetails[];
  _getAllMatches: () => void;
}

const MatchListComp = (props: IMatchListProps) => {
  const { allMatches, _getAllMatches } = { ...props };
  React.useEffect(() => {
    _getAllMatches();
  }, []);
  return allMatches.length ? (
    <MatchListItems matches={allMatches || []} />
  ) : (
    <HMAlert type={EAlertType.INFO}>
      <>No results to display!</>
    </HMAlert>
  );
};

const mapStateToProps = (state: IRootReducerState) => {
  return {
    allMatches: state.matchList.allMatches,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _getAllMatches: () => {
      dispatch(getAllMatches());
    },
  };
};

const MatchList = connect(mapStateToProps, mapDispatchToProps)(MatchListComp);

export { MatchList };
