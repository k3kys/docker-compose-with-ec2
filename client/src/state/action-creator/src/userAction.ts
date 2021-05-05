import axios from "axios"
import { Dispatch } from "redux"
import { ActionType } from "../../constants"
import { Action } from "../../actions"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();


export const signin = (email: string, password: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({ type: ActionType.USER_SIGNIN_REQUEST, payload: { email, password } })

        try {
            const { data } = await axios.post("/api/users/signin", { email, password })

            dispatch({ type: ActionType.USER_SIGNIN_SUCCESS, payload: data.data.user })

            localStorage.setItem("userInfo", JSON.stringify(data));

        } catch (error) {
            dispatch({
                type: ActionType.USER_SIGNIN_ERROR,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const emailConfirm = (email: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({ type: ActionType.EMAIL_CONFIRM_REQUEST, payload: email })

        try {
            const { data } = await axios.post("/api/users/send-email", { email })

            dispatch({ type: ActionType.EMAIL_CONFIRM_SUCCESS, payload: data.data })

            localStorage.setItem("emailInfo", JSON.stringify(jwt.sign(data.data,process.env.REACT_APP_JWT_KEY!)));

        } catch (error) {
            dispatch({
                type: ActionType.EMAIL_CONFIRM_ERROR,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const signup = (name: string, email: string, password: string, confirmPassword: string, university: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({ type: ActionType.USER_SIGNUP_REQUEST, payload: { name, email, password, confirmPassword, university } })

        try {
            const { data } = await axios.post("/api/users/signup", { name, email, password, confirmPassword, university })

            dispatch({ type: ActionType.USER_SIGNUP_SUCCESS, payload: data.data.user })

            localStorage.setItem("userInfo", JSON.stringify(data));

            localStorage.removeItem("emailInfo");

            
        } catch (error) {
            dispatch({
                type: ActionType.USER_SIGNUP_ERROR,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const signout = () => {
    return async (dispatch: Dispatch<Action>) => {

        await axios.post("/api/users/signout", {})
        
        dispatch({ type: ActionType.USER_SIGNOUT });

        localStorage.removeItem("userInfo");
    
    }
}