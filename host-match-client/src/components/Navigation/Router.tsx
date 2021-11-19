import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { PlayerList } from "../../pages/Players/playerList";
import { MyTeamsMatches, TeamList } from "../../pages/Teams";
import { MyTeam } from "../../pages/Teams/Team";
import { HMUserProfile } from "../../pages/UserProfile";
import { EViewModes } from "../../utilities/enums";
import {
  HostedMatches,
  IMatchDetailsProps,
  MyMatchDetails,
} from "../../pages/HostMatch";
import { MatchList } from "../../pages/Matches/MatchList";
import { HostView } from "../../pages/HostView/HostView";
import { ScoreContainer } from "../../pages/Score/ScoreContainer";

const HMRouter = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/" component={MatchList} />
      <Route path="/teams" component={TeamList} />
      <Route path="/profile" component={HMUserProfile} />
      <Route
        path="/myTeam"
        render={() => <MyTeam viewMode={EViewModes.READ} />}
      />
      <Route exact path="/players" component={PlayerList} />
      <Route exact path="/hostMatch" component={HostedMatches} />
      <Route exact path="/hostMatch/match" component={MyMatchDetails} />
      <Route path="/match/:id" component={ScoreContainer} />
      <Route path="/hostMatch/:id" component={HostView} />

      <Route path="*">
        <h1>no match found</h1>
      </Route>
    </Switch>
  );
};

export { HMRouter };
