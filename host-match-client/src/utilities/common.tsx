import { IHMNotification } from "../components";
import { IMatchData, IMatchDetails } from "../pages/HostMatch";
import { IPlayerDetails } from "../pages/Players/utilities";
import { ITeam } from "../pages/Teams";
import { IUserProfie } from "../pages/UserProfile";
import { debounce } from "lodash";
import React from "react";
import { IMatchListReducer } from "../store/reducers/matchListReducer";

const DEFAULT_DEBOUNCE_VALUE: number = 1000;

export const useDebounce = (
  fnToDebounce: any,
  durationInMs = DEFAULT_DEBOUNCE_VALUE
) => {
  if (isNaN(durationInMs)) {
    throw new TypeError("durationInMs for debounce should be a number");
  }

  if (fnToDebounce == null) {
    throw new TypeError("fnToDebounce cannot be null");
  }

  if (typeof fnToDebounce !== "function") {
    throw new TypeError("fnToDebounce should be a function");
  }

  return debounce(fnToDebounce, durationInMs);
};
