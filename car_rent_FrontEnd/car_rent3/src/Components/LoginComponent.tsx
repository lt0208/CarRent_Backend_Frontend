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
    const [usernamEmpty, setUsernameEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    // const [message, setMessage] = useState("");
    const navigation = useNavigate();
    const form = useRef();
    const checkBtn = useRef();

    function handleLogin(e: any) {
        e.preventDefault();
        if (username === "") {
            setUsernameEmpty(true)

        }
        if (password === "") {
            setPasswordEmpty(true)

        }
        
        console.log("handleLogin")


        AuthService.signin(username, password).then(
            (response: any) => {
                window.alert("Login successfully")
                console.log("localStorage: " + localStorage.getItem("user"));
                navigation("/");
                window.location.reload();
            },

            (error: any) => {
                console.log("error:  " + error)
                window.alert(error.response.data)
            }
        )

    }
    return (
        <div>

            <h3>Please log in to continue...</h3>
            <form >
                <div className="signup-div" >
                    <label className="form-label" htmlFor="username1">Username:</label>
                        <input
                            id="username1"
                            type="text"
                           
                            onChange={(e: any) => {
                                setUsername(e.target.value)
                                setUsernameEmpty(false)
                            }}></input> 
                    {usernamEmpty && <p style={{ color: 'red' }}>Please input username to login!</p>}
                </div>

                <div className="signup-div">
                    <label className="form-label" htmlFor="password1">Password:</label>
                        <input
                        id="password1"
                            type="password" 
                            onChange={(e: any) => {
                                setPassword(e.target.value)
                                setPasswordEmpty(false)
                                }}></input> 
                    {passwordEmpty && <p style={{ color: 'red' }} >Please input password to login!</p>}
                </div >
                <button className="btn btn-primary" onClick={e => handleLogin(e)}>Login</button>
            </form>
        </div>
    )
}

export default LoginComponent