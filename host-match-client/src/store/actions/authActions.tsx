import { IDispatch, IError, IFirebaseActionDispatcher, IGetState } from "../../utilities";
import { firebase } from '../../config/fbConfig';
import { EAuthAction } from "../../utilities/auth";

const signIn = (): IFirebaseActionDispatcher => {
    return (dispatch: IDispatch, getState: IGetState): void => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // const credential: any = FacebookAuthProvider.credentialFromResult(result);
            // const accessToken = credential.accessToken;
            // console.log('accessToken ', accessToken);

            // ...
            dispatch({
                type: EAuthAction.SET_USER,
                value: user
            });
        })
        .catch((error: any) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            // const credential = FacebookAuthProvider.credentialFromError(error);
            dispatch({
                type: EAuthAction.SIGN_IN_ERROR,
                value: errorMessage
            });
            //console.log('credential ', credential);
            // ...
        });
    }
}

const signOut = (): IFirebaseActionDispatcher => {
    return (dispatch: IDispatch, getState: IGetState): void => {
        firebase.auth().signOut()
        .then((result) => {
            dispatch({
                type: EAuthAction.SET_USER,
                value: null
            });
        })
        .catch((error: any) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            // const credential = FacebookAuthProvider.credentialFromError(error);
            dispatch({
                type: EAuthAction.SIGN_IN_ERROR,
                value: errorMessage
            });
            //console.log('credential ', credential);
            // ...
        });
    }
}

export { signIn, signOut };