import React, {useState} from "react";
import useToken from "./useToken";
import Auth from "./components/login/Auth";
import useId from "./useId";
import Dashboard from "./components/pages/Dashboard";
import ReactLoading from 'react-loading'
import './App.css'

async function verify(token) {
    let result = await fetch('http://localhost:8080/verify', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    }).then(data => data.json())

    return !result.error;
}

function App() {

    const { token, setToken } = useToken();
    const { userid, setUserid } = useId();
    const [ok,setOk] = useState(null);
    const [done, setDone] = useState(undefined)

    if(token === null) {
        return <Auth setToken={setToken} setUserid={setUserid}/>;
    }
    verify(token)
        .then(res => {
            setDone(true);
            setOk(res);
        });

    return(
        <div className={"wrapper"}>
            {!done ? (
                <ReactLoading
                    className={"loader"}
                    type={"spin"}
                    color={"#000000"}
                />
            ) :   ok ? (<Dashboard token={token} userid={userid}/>) : (<Auth setToken={setToken} setUserid={setUserid}/>)
            }

        </div>
    );
}

export default App;