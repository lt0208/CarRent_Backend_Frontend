import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import RequestService from '../services/RequestService';
import axios from 'axios';
import authHeader from '../services/AuthorizationHeader';

const WelcomeComponent = () => {
    const [user, setUser] = useState(undefined);
    const[username, setUsername] = useState("");
    const[role, setRole] = useState("");
    const[isManager, setIsManager] = useState(false);
    const[isCustomer, setIsCustomer] = useState(false);
    useEffect(
        () => {
            const user = AuthService.getCurrentUser();
            if (user){
                setUser(user);
                setUsername(user.username);
                setRole(user.roles[0].substring(5));
                setIsManager(user.roles.includes('ROLE_MANAGER'))
                setIsCustomer(user.roles.includes('ROLE_CUSTOMER'))
            }
        }, []
    )

  return (
    <div>
       
        {user? (<h2>Hi, <strong>{username}</strong> ,you are logging as [{role}], welcome to car rental system!</h2>)
        :(<h2> Welcome to car rental system! <br></br>Please signin or signup!</h2>)}

       {isManager &&  <Link className='btn btn-success' to={"/all-requests/:submitted"}>Please check the submitted requests</Link>}
       {isCustomer &&  <Link className='btn btn-primary' to={"/all-cars/:available"}>Start to book a car</Link>}
       {'    '}
       {isCustomer &&  <Link className='btn btn-success' to={"/requests-customer"}>View Requests and User Info</Link>}
        
    </div>
  )
}

export default WelcomeComponent