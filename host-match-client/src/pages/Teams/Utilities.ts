import { Action, ActionCreator } from "redux";
import { EFieldType, IAttrs } from "../../components";
import { IAction } from "../../utilities";

export interface ITeam {
    id: string;
    name: string;
    contact?: string;
    createdByName?: string;
    createdById?: string;
    address?: string;
    
}

export type ICreateTeam = (team: ITeam) => void;

export interface IHTMTeamListProps {
    uid: string;
    teams: ITeam[],
    _getTeams: () => ITeam[],
    _createTeam: ICreateTeam
}

export interface ICreateTeamState {
    name: string
    contact: string;
}

export enum ECreateTeamAction {
    SET_NAME = 'SET_NAME',
    SET_CONTACT = 'SET_CONTACT',
    SET_ADDRESS = 'SET_ADDRESS',
    SET_OWNER = 'SET_OWNER',
    SET_TEAM = 'SET_TEAM'
}

export const createTeamReducer = (state: ITeam, action: IAction): ITeam => {
    switch (action.type) {
        case ECreateTeamAction.SET_NAME:
            return {
                ...state,
                name: action.value
            };
        case ECreateTeamAction.SET_CONTACT:
            return {
                ...state,
                contact: action.value
            }
        case ECreateTeamAction.SET_ADDRESS:
            return {
                ...state,
                address: action.value
            }
        case ECreateTeamAction.SET_TEAM:
            return {
                ...action.value
            }    
        default:
            return state;
    }
};

export const getTeamFields = (state: ITeam, setTeamField: (value: string, action: string) => void): IAttrs[] => [
    {
        label: 'Team name',
        placeholder: 'Give name to your team',
        required: true,
        fieldKey: ECreateTeamAction.SET_NAME,
        onFieldChange: setTeamField,
        value: state.name
    },
    {
        label: 'Contact',
        placeholder: 'Enter team contact nunber',
        required: true,
        fieldKey: ECreateTeamAction.SET_CONTACT,
        onFieldChange: setTeamField,
        value: state.contact
    },
    {
        label: 'Address',
        placeholder: 'Address details',
        required: true,
        fieldKey: ECreateTeamAction.SET_ADDRESS,
        onFieldChange: setTeamField,
        value: state.address,
        fieldType: EFieldType.TEXT_AREA
    },
    {
        label: 'Created by',
        value: state.createdByName,
        readOnly: true,
        required: true,
        fieldKey: ECreateTeamAction.SET_OWNER
    }
];

export const isMyTeamCreated = (myTeam?: any): boolean => {
    return myTeam && !!myTeam.id ? true : false;
}