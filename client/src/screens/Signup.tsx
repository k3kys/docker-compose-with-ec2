import React, { useEffect, useState } from 'react';
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useActions"
import { RouteComponentProps } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface SignupProps { }

const Signup: React.FC<RouteComponentProps> = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [authNumber, setAuthNumber] = useState("")

    const { loading, error, userInfo } = useTypedSelector((state) => state.userSignup)

    const { signup } = useActions()

    const history = useHistory();

    const parsedData: string = JSON.parse(localStorage.getItem("emailInfo")!)
    
    //@ts-ignore
    const userEmail: any = jwt.verify(parsedData, process.env.REACT_APP_JWT_KEY!)

    let authCode = userEmail.number

    let email = userEmail.email

    let domain = email.match("(?<=@)[^.]+(?=\.)").toString()

    useEffect(() => {
        if (userInfo) {

            history.push("/")

            window.location.reload()
        }
    }, [history, userInfo]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("비밀번호를 다시 확인해 주세요.");
            // @ts-ignore
        } else if (parseInt(authNumber) !== authCode) {
            alert("인증번호를 다시 확인해 주세요.");
        } else {
            signup(name, email, password, confirmPassword, domain)
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="offset-md-4 col-md-4 mt-5">
                    <h2 className="text-center">회원 가입</h2>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">회원가입에 실패하였습니다</MessageBox>}
                    <hr />
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="">이메일</label>
                            <input type="email"
                                id="email"
                                value={email}
                                placeholder="이메일을 입력하세요"
                                required
                                readOnly
                                className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">이름</label>
                            <input type="text"
                                id="name"
                                placeholder="이름을 입력하세요"
                                required
                                onChange={e => setName(e.target.value)}
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

                        <div className="form-group">
                            <label htmlFor="">비밀번호 확인</label>
                            <input type="confirmPassword"
                                id="password"
                                placeholder="비밀번호를 확인하세요"
                                required
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">인증번호</label>
                            <input type="text"
                                id="authNumber"
                                placeholder="인증번호을 입력하세요"
                                required
                                onChange={e => setAuthNumber(e.target.value)}
                                className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">소속학교</label>
                            <input type="text"
                                id="school"
                                value={domain + " University"}
                                required
                                readOnly
                                className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">회원 가입</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;