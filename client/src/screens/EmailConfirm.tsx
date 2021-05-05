import React, { useEffect, useState } from 'react';
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useActions"
import { useHistory } from "react-router-dom";
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"

export interface EmailConfirmProps { }

const EmailConfirm: React.FC<EmailConfirmProps> = () => {
    const [email, setEmail] = useState("");

    const { loading, error, userInfo } = useTypedSelector((state) => state.emailConfirm)

    const { emailConfirm } = useActions()

    let history = useHistory();

    useEffect(() => {
        if (userInfo) {
            history.push("/signup")
        }
    }, [history, userInfo]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailConfirm(email)
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="offset-md-4 col-md-4 mt-5">
                    <h2 className="text-center">학교 웹메일 인증</h2>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">정확한 학교 웹메일을 기입해 주세요.</MessageBox>}
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

                        <button type="submit" className="btn btn-primary btn-block">인증 하기</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmailConfirm;