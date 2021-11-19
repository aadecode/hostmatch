import { IAction } from "../../utilities";
import { EAuthAction } from "../../utilities/auth";

const defaultAuth = {
    error: '',
    user: null
};

export const authReducer = (state = defaultAuth, action: IAction) => {
    switch (action.type) {
        case EAuthAction.SIGN_IN_ERROR:
            return {
                error: action.value,
                user: null
            };
        case EAuthAction.SET_USER:
            return {
                user: action.value,
                error: ''
            };    
        default:
            return state;
    }
}