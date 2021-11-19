import React from "react";
import { EFieldType, IAttrs } from "../../components";
import { IHMListItemProps } from "../../components/ListIttem";
import { IHMOption } from "../../components/SearchSelect";
import { IAction } from "../../utilities";
import { getTodaysDateWithTime } from "../../utilities/dateService";
import { ITeam } from "../Teams";

export enum EMatchDetailsAction {
  SET_TITLE = "title",
  SET_LOCATION = "location",
  SET_CONTACT = "contact",
  ADD_TEAM = "ADD_TEAM",
  REMOVE_TEAM = "REMOVE_TEAM",
  SET_PLAYER_COUNT = "playerCount",
  SET_TEAM1_PLAYERS = "team1Players",
  SET_TEAM2_PLAYERS = "team2Players",
  SET_MATCH_DETAILS = "matchDetails",
  SET_IS_LIVE = "isLive",
  SET_TIME = "time",
}

export enum EMatchStatus {
  LIVE = "live",
  WON = "won",
  LOST = "LOST",
  TIE = "TIE",
  DRAW = "DRAW",
  ABONDON = "abandon",
  SCHEDULED = "scheduled",
}

export interface IMatchDetails {
  id?: string;
  createdById: string;
  status?: string;
  title: string;
  location: string;
  contact: string;
  teams: IHMOption[];
  playerCount: number;
  team1Players: string[];
  team2Players: string[];
  time: string;
}

export interface IMatchData {
  matches: IMatchDetails[];
}

export const matchDetailsStateReducer = (
  state: IMatchDetails,
  action: IAction
): IMatchDetails => {
  switch (action.type) {
    case EMatchDetailsAction.SET_TITLE:
      return {
        ...state,
        [EMatchDetailsAction.SET_TITLE]: action.value,
      };
    case EMatchDetailsAction.SET_LOCATION:
      return {
        ...state,
        [EMatchDetailsAction.SET_LOCATION]: action.value,
      };
    case EMatchDetailsAction.SET_CONTACT:
      return {
        ...state,
        [EMatchDetailsAction.SET_CONTACT]: action.value,
      };
    case EMatchDetailsAction.SET_TIME:
      return {
        ...state,
        [EMatchDetailsAction.SET_TIME]: action.value,
      };
    case EMatchDetailsAction.SET_PLAYER_COUNT:
      return {
        ...state,
        [EMatchDetailsAction.SET_PLAYER_COUNT]: action.value,
      };
    case EMatchDetailsAction.ADD_TEAM:
      const teamsToAdd: IHMOption[] = state.teams ? [...state.teams] : [];
      teamsToAdd.push(action.value);
      return {
        ...state,
        teams: [...teamsToAdd],
      };
    case EMatchDetailsAction.REMOVE_TEAM:
      const teamsToRemove: IHMOption[] = state.teams ? [...state.teams] : [];
      const removeIndex: number = teamsToRemove.findIndex((team: IHMOption) => {
        return action.value.key === team.key;
      });
      teamsToRemove.splice(removeIndex, 1);
      return {
        ...state,
        teams: [...teamsToRemove],
      };
    case EMatchDetailsAction.SET_MATCH_DETAILS:
      return {
        ...action.value,
      };

    default:
      return state;
  }
};

type ISearchFunction = (searchKey: string) => void;
type ISetFieldFunction = (value: any, action?: any) => void;

export const getMatchDetailFields = (
  state: IMatchDetails,
  setMatchField: ISetFieldFunction
): IAttrs[] => [
  {
    label: "Match title",
    placeholder: "Give your match a title",
    required: true,
    fieldKey: EMatchDetailsAction.SET_TITLE,
    onFieldChange: setMatchField,
    value: state.title,
  },
  {
    label: "Location",
    placeholder: "Enter match location",
    required: true,
    fieldKey: EMatchDetailsAction.SET_LOCATION,
    onFieldChange: setMatchField,
    value: state.location,
    fieldType: EFieldType.TEXT_AREA,
  },
  {
    label: "Contact",
    placeholder: "Enter contact number",
    required: true,
    fieldKey: EMatchDetailsAction.SET_CONTACT,
    onFieldChange: setMatchField,
    value: state.contact,
  },
  {
    label: "Player count",
    placeholder: "Enter player count",
    required: true,
    fieldKey: EMatchDetailsAction.SET_PLAYER_COUNT,
    onFieldChange: setMatchField,
    value: state.playerCount,
  },
  {
    label: "Time",
    placeholder: "Select time",
    required: true,
    fieldKey: EMatchDetailsAction.SET_TIME,
    onFieldChange: setMatchField,
    type: "datetime-local",
    value: state.time,
    min: state.time,
  },
];

export const getHMOptions = (teamOptions: ITeam[]): IHMListItemProps[] => {
  return teamOptions.map((team: ITeam): IHMListItemProps => {
    return {
      itemId: team.id,
      title: team.name,
      desc: team.address,
      subTitle: team.createdByName,
    };
  });
};

export const getInitialMatchDetailsState = (
  contact: string,
  playerId: string
): IMatchDetails => {
  return {
    title: "",
    createdById: playerId || "",
    location: "",
    contact: contact || "",
    playerCount: 7,
    team1Players: [],
    team2Players: [],
    status: EMatchStatus.SCHEDULED,
    time: "" || getTodaysDateWithTime(),
    teams: [],
  };
};
