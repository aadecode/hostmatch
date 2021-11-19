import firebase from "firebase";
import { Config } from "redux-firestore";

export type IDispatch = any;
export type IGetState = any;
export type IFirebaseExtraArgs = any;
//export type IFireStore =  (firebaseInstance: typeof firebase, otherConfig?: Partial<Config>) => any;
export type IFireStore = any;
export type IError = Error;
export type IResponseData = Response;
export type IFirebaseActionDispatcher = (dispatch: IDispatch, getState: IGetState, { getFirestore }: IFirebaseExtraArgs) => void;
export type IAnyProps = any;
export type IAction = {
    type: string;
    value?: any;
};
export type IEvent = React.FormEvent<HTMLInputElement>;