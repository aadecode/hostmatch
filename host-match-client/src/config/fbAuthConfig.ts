//import { FacebookAuthProvider } from "firebase/auth";
//import { getAuth, signInWithPopup} from "firebase/auth";

import { firebase } from './fbConfig';

const provider = new firebase.auth.FacebookAuthProvider();
    
//const auth = getAuth();
const signInWithFb = (): void => {
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log('user ', user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const credential: any = FacebookAuthProvider.credentialFromResult(result);
        // const accessToken = credential.accessToken;
        // console.log('accessToken ', accessToken);

        // ...
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        // const credential = FacebookAuthProvider.credentialFromError(error);
        console.log('error  ', error);
        //console.log('credential ', credential);
        // ...
    });
}


  export { signInWithFb };