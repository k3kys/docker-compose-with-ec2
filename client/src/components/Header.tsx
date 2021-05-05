import * as React from 'react';
import { Link } from "react-router-dom"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useActions"


export interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {

    const { userInfo } = useTypedSelector((state) => state.userSignin)

    const { signout } = useActions()

    const signoutHandler = () => {
        signout()
    }

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Language</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#"> 언어 강의 <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="#"> 강사 등록 <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            {userInfo ? "" : <Link className="nav-link" to="/email-confirm"> 회원 가입 </Link>}
                        </li>

                        <li className="nav-item active">
                            {userInfo ? <Link className="nav-link" to="#signout" onClick={signoutHandler}> 로그아웃 </Link> : <Link className="nav-link" to="/signin"> 로그인 </Link>}
                        </li>

                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>

        </div>
    );
}

export default Header;