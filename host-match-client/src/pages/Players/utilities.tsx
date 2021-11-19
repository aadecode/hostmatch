import { IUserProfie } from "../UserProfile";

export interface IPlayerDetails {
    id: string;
    displayName: string;
    email: string;
    phoneNumber: string | number | null;
    photoURL: string;
    uid: string;
};

export const getCurrentPlayerDetails = (profile: IUserProfie): IPlayerDetails => {
    return {
        id: profile.uid,
        displayName: profile.displayName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        photoURL: profile.photoURL,
        uid: profile.uid
    }
}