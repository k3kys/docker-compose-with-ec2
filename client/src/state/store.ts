import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import reducers from "./reducers"

const localStore = {
    userSignin: {
      userInfo: localStorage.getItem("userInfo")
      //@ts-ignore
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    },
    emailConfirm: {
      emailInfo: localStorage.getItem("emailInfo")
      //@ts-ignore
        ? JSON.parse(localStorage.getItem("emailInfo"))
        : null,
      // authNumber: localStorage.getItem("authNumberInfo")
      // //@ts-ignore
      //   ? JSON.parse(localStorage.getItem("authNumberInfo"))
      //   : null,
    },
  };

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//@ts-ignore
export const store = createStore(reducers, localStore, composeEnhancers(applyMiddleware(thunk)))