import React, { useState } from "react";
import PropTypes from 'prop-types';
import loginImg from "../login/login.svg";
import './style.scss';
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

async function loginUser(credentials) {
    return fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export default function Login(props) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        if (username === undefined || username.toString().length < 6 || username.toString().length > 32) {
            setError("Username should be minimum 6 character!");
            return;
        }
        if (password === undefined || password.toString().length < 6) {
            setError("Password should be minimum 6 character!")
            return;
        }
        const resp = await loginUser({
            username,
            password
        });
        if(resp.error) {
            setError(resp.error);
        } else {
            props.setToken(resp.token);
            props.setUserid(resp.userid);
            window.location.reload();
        }
    };

        return (
            <div className="base-container" ref={props.containerRef}>
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg} alt=""/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="username" onChange={e => setUserName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div>
                    {(props.error || error) && (
                        <Alert severity="error" onClick={() => setError(null)}>
                            {props.error || error}
                        </Alert>)}
                </div>
                <div className="footer">
                    <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </div>
        );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUserid: PropTypes.func.isRequired
}
