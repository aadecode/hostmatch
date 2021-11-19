export interface IUserProfie {
    [key: string]: any;
    apiKey: string;
    displayName: string;
    email: string;
    isEmpty: boolean;
    isLoaded: boolean;
    lastLoginAt: string;
    phoneNumber: string | number | null;
    photoURL: string;
    redirectEventId: null
    stsTokenManager: {apiKey: string; refreshToken: string; expirationTime: number;}
    uid: string;
}

export const profileKeys = [
    "displayName",
    "email",
    "phoneNumber",
    // "createdAt",
    // "lastLoginAt"
]

export const dateKeys = [
    "createdAt",
    "lastLoginAt"    
]