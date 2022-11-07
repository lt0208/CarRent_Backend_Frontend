import React,{useState, useEffect} from 'react'
import AuthService from '../services/AuthService';
import RequestService from '../services/RequestService';
import axios from 'axios';
import authHeader from '../services/AuthorizationHeader';

const WelcomeComponent = () => {
    const [user, setUser] = useState(undefined);
    const[username, setUsername] = useState("");
    const[role, setRole] = useState("");
    useEffect(
        () => {
            const user = AuthService.getCurrentUser();
            if (user){
                setUser(user);
                setUsername(user.username);
                setRole(user.roles[0].substring(5));
            }
        }, []
    )

  return (
    <div>
       
        {user? (<h2>Hi, <strong>{username}</strong> ,you are logging as [{role}], welcome to car rental system!</h2>)
        :(<h2> Welcome to car rental system! <br></br>Please signin or signup!</h2>)}
        
    </div>
  )
}

export default WelcomeComponent