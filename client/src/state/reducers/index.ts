import { userSigninReducer, userSignupReducer, emailConfirmReducer } from './src/userReducer';
import { combineReducers } from "redux"

const reducers = combineReducers({
    userSignin: userSigninReducer,
    userSignup: userSignupReducer,
    emailConfirm: emailConfirmReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>