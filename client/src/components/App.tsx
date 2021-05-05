import * as React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header"
import Signup from "../screens/Signup"
import Signin from '../screens/Signin';
import EmailConfirm from '../screens/EmailConfirm';
import LoadingBox from './LoadingBox';

export interface AppProps { }

const App: React.FC<AppProps> = () => {

    return (
        <BrowserRouter>
            <div>
                <header>
                    <Header/>
                </header>
                <main>
                <Route path="/" exact></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/signin" component={Signin}></Route>
                <Route path="/email-confirm" component={EmailConfirm}></Route>
                <Route path="/loading" component={LoadingBox}></Route>
                </main>
                <footer></footer>
            </div>
        </BrowserRouter>


    );
}

export default App;