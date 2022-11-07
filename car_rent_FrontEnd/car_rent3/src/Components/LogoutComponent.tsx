import React, { useEffect } from 'react'
import AuthService from '../services/AuthService'
import { useNavigate } from 'react-router-dom';
const LogoutComponent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AuthService.signout();
    //window.alert("You have logged out!")
    navigate("/");

    window.location.reload();
  },[]);
  return (
    <div>You have logged out!</div>
  )
}

export default LogoutComponent