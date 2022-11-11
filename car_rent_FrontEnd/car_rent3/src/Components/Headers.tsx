import React, { useState, useEffect } from 'react'
import AuthService from '../services/AuthService';
import { Link } from 'react-router-dom';

const Headers = () => {
  const [user, setUser] = useState(undefined);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser(); // this is a const value, obtain the user obj immedaitely, faster than the user in state
    if (user) {
      console.log("user:  "+JSON.stringify(user));
      console.log("user roles:  "+JSON.stringify(user.roles));

      setUser(user);
      setIsCustomer(user.roles.includes('ROLE_CUSTOMER'))
      setIsManager( user.roles.includes('ROLE_MANAGER'))
    }

  }, [])

  return (
    <nav className="navbar" style={{backgroundColor: "DarkSeaGreen"}}>

   
      <div className="container-fluid">
        
        <ul className="nav nav-pills card-header-pills">

          {!user && (<li className="nav-item">
            <a className="navbar-brand" href="/login">Log in</a>
          </li>)}

          {isManager &&  (<li className="nav-item">
            <a className="navbar-brand" href="/all-cars">All Cars</a>
          </li>)}

          {isCustomer && (<li className="nav-item">
            <a className="navbar-brand" href="/all-cars/:available">Available Cars</a>
          </li>)}

          {isManager && (<li className="nav-item">
            <a className="navbar-brand" href="/all-requests">All Requests</a>
          </li>)}

          {isManager && (<li className="nav-item">
            <a className="navbar-brand" href="/all-requests/:submitted">Submitted Requests</a>
          </li>)}

          {isCustomer &&
            (<li className="nav-item">
              <a className="navbar-brand" href="/requests-customer">Customer Account</a>
            </li>)}

          {user && (<li className="nav-item">
            <a className="navbar-brand" href="/logout">Logout</a>
          </li>)}

          {!user && (
            <li className='nav-item'>
              <Link  className="navbar-brand" to="/signup">Sign Up</Link>

            </li>
          )}
        </ul>
        <h5 >Credentials for testing, manager: tim, 4321, customer: jack, 4321</h5>
      </div>

    
</nav>
    
  )
}

export default Headers;