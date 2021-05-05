import { ActionType } from "../constants";

export type Action =
    | SigninRequestAction
    | SigninSuccessAction
    | SigninErrorAction
    | SignupRequestAction
    | SignupSuccessAction
    | SignupErrorAction
    | EmailConfirmRequestAction
    | EmailConfirmSuccessAction
    | EmailConfirmErrorAction
    | SignOutAction

interface SigninRequestAction {
    type: ActionType.USER_SIGNIN_REQUEST
}

interface SigninSuccessAction {
    type: ActionType.USER_SIGNIN_SUCCESS
    payload: string[]
}

interface SigninErrorAction {
    type: ActionType.USER_SIGNIN_ERROR
    payload: string
}

interface SignupRequestAction {
    type: ActionType.USER_SIGNUP_REQUEST
}

interface SignupSuccessAction {
    type: ActionType.USER_SIGNUP_SUCCESS
    payload: string[]
}

interface SignupErrorAction {
    type: ActionType.USER_SIGNUP_ERROR
    payload: string
}

interface EmailConfirmRequestAction {
    type: ActionType.EMAIL_CONFIRM_REQUEST
    payload: string

}
interface EmailConfirmSuccessAction {
    type: ActionType.EMAIL_CONFIRM_SUCCESS
    payload: string[]

}
interface EmailConfirmErrorAction {
    type: ActionType.EMAIL_CONFIRM_ERROR
    payload: string
}

interface SignOutAction {
    type: ActionType.USER_SIGNOUT
}