import React, { useEffect, useState } from 'react';
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useActions"
import { useHistory } from "react-router-dom";
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"

export interface SigninProps { }

const Signin: React.FC<SigninProps> = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, error, userInfo } = useTypedSelector((state) => state.userSignin)

    const { signin } = useActions()

    let history = useHistory();

    useEffect(() => {
        if (userInfo) {
            history.push("/")
        }
    }, [userInfo, history]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signin(email, password)
    
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="offset-md-4 col-md-4 mt-5">
                    <h2 className="text-center">로그인</h2>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">로그인에 실패하였습니다.</MessageBox>}
                    <hr />
                    <form onSubmit={submitHandler}>
                    <div className="form-group">
                            <label htmlFor="">이메일</label>
                            <input type="email"
                                id="email"
                                placeholder="이메일을 입력하세요"
                                required
                                onChange={e => setEmail(e.target.value)}
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">비밀번호</label>
                            <input type="password"
                                id="password"
                                placeholder="비밀번호를 입력하세요"
                                required
                                onChange={e => setPassword(e.target.value)}
                                className="form-control" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">로그인</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signin;