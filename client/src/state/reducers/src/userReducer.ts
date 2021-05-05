import { ActionType } from '../../constants';
import { Action } from "../../actions"

interface RepositoriesState {
    loading: boolean
    error: string | null
    userInfo?: any | null
}

const initialState = {
    loading: false,
    error: null,
    userInfo: null
}

export const userSigninReducer = (
    state: RepositoriesState = initialState,
    action: Action
): RepositoriesState => {
    switch (action.type) {
        case ActionType.USER_SIGNIN_REQUEST:
            return { loading: true, error: null }
        case ActionType.USER_SIGNIN_SUCCESS:
            return { loading: false, error: null, userInfo: action.payload }
        case ActionType.USER_SIGNIN_ERROR:
            return { loading: false, error: action.payload }
        case ActionType.USER_SIGNOUT:
            //@ts-ignore
            return { }
        default:
            return state
    }
}

export const emailConfirmReducer = (
    state: RepositoriesState = initialState,
    action: Action
): RepositoriesState => {
    switch (action.type) {
        case ActionType.EMAIL_CONFIRM_REQUEST:
            return { loading: true, error: null }
        case ActionType.EMAIL_CONFIRM_SUCCESS:
            return { loading: false, error: null, userInfo: action.payload }
        case ActionType.EMAIL_CONFIRM_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userSignupReducer = (
    state: RepositoriesState = initialState,
    action: Action
): RepositoriesState => {
    switch (action.type) {
        case ActionType.USER_SIGNUP_REQUEST:
            return { loading: true, error: null }
        case ActionType.USER_SIGNUP_SUCCESS:
            return { loading: false, error: null, userInfo: action.payload }
        case ActionType.USER_SIGNUP_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}