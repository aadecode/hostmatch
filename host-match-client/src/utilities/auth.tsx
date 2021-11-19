export enum EAuthAction {
    SIGN_IN_ERROR = 'SIGN_IN_ERROR',
    SET_USER = 'SET_USER'
}

export interface IAuth {
    error: string;
    user: any;
}