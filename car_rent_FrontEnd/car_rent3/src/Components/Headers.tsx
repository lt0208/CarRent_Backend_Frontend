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
      setUser(user);
      setIsCustomer(user.roles.includes('CUSTOMER') || user.roles.includes('ROLE_CUSTOMER'))
      setIsManager(user.roles.includes('MANAGER') || user.roles.includes('ROLE_MANAGER'))
    }

  }, [])

  return (
    <div className="card text-center">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills">

          {!user && (<li className="nav-item">
            <a className="nav-link" href="/login">Log in</a>
          </li>)}

          {isManager &&  (<li className="nav-item">
            <a className="nav-link" href="/all-cars">All Cars</a>
          </li>)}

          {isCustomer && (<li className="nav-item">
            <a className="nav-link" href="/all-cars/:available">Available Cars</a>
          </li>)}

          {isManager && (<li className="nav-item">
            <a className="nav-link" href="/all-requests">All Requests</a>
          </li>)}

          {isManager && (<li className="nav-item">
            <a className="nav-link" href="/all-requests/:submitted">Submitted Requests</a>
          </li>)}

          {isCustomer &&
            (<li className="nav-item">
              <a className="nav-link" href="/requests-customer">Customer Account</a>
            </li>)}

          {user && (<li className="nav-item">
            <a className="nav-link" href="/logout">Logout</a>
          </li>)}

          {!user && (
            <li className='nav-item'>
              <Link  className="nav-link" to="/signup">Sign Up</Link>

            </li>
          )}

        </ul>
      </div>

    </div>
  )
}

export default Headers;