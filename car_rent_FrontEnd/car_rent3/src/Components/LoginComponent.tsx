import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const isRequired = (value: any) => {
    if (!value) {
        return (
            <div className="alert alert-danger">
                "Can't be empty!"
            </div>)
    }
}

const usernameSize = (value: String) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger">
                Size should be 3-20 characters!

            </div>
        )
    }
}

const passwordSize = (value: String) => {
    if (value.length < 10) {
        return (
            <div className="alert alert-danger">
                Not a valid password!

            </div>
        )
    }
}

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [message, setMessage] = useState("");
    const navigation = useNavigate();
    const form = useRef();
    const checkBtn = useRef();

    function handleLogin(e: any) {
        e.preventDefault();
        console.log("handleLogin")


        AuthService.signin(username, password).then(
            (response:any) => {               
                window.alert("Login successfully")
                console.log("localStorage: " +   localStorage.getItem("user"));
                navigation("/");
                window.location.reload();
            },

            (error:any) => {
                    console.log("error:  "+error)
                    window.alert("Login error: " + error.message)
            }
        )

    }
    return (
        <div>
            <form >
                <div className="mb-3">
                    <label  className="form-label">Username: 
                    <input
                        
                        type="text" 
                        className="form-control"
                        onChange={(e: any) => setUsername(e.target.value)}></input> </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">Password:
                    <input
                        type="password" className="form-control"
                        onChange={(e: any) => setPassword(e.target.value)}></input> </label>
                </div >
                <button className="btn btn-primary" onClick={e =>handleLogin(e)}>Login</button>
            </form>
        </div>
    )
}

export default LoginComponent