import React, {useState} from "react";
import './style.scss'
import loginImg from "../login/login.svg";
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

async function registerUser(credentials) {
    return fetch('http://localhost:8080/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export default function Register(props) {

    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        if (username === undefined || username.toString().length < 6 || username.toString().length > 32) {
            setError("Username should be minimum 6 character!");
            return;
        }
        if (email === undefined || !validateEmail(email)) {
            setError("Email is not valid!");
            return;
        }
        if (password === undefined || password.toString().length < 6) {
            setError("Password should be minimum 6 character!");
            return;
        }
        const resp = await registerUser({
            username,
            email,
            password
        });
        if (resp.error) {
            setError(resp.error);
        } else {
            props.changeState();
        }
    }

    return (
        <div className="base-container" ref={props.containerRef}>
            <div className="header">Register</div>
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
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" placeholder="email" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
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
                    Register
                </button>
            </div>
        </div>
    );
}