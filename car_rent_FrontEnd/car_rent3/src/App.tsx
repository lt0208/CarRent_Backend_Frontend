import React,{useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ListCarsComponent from './Components/ListCarsComponent';
import SaveCarComponent from './Components/SaveCarComponent';
import MakeRequestComponent from './Components/MakeRequestComponent';
import Headers from './Components/Headers';
import ListRequestsByCondition from './Components/ListRequestsByCondition';
import LoginComponent from './Components/LoginComponent';
import LogoutComponent from './Components/LogoutComponent';
import ListRequestsByCustomer from './Components/ListRequestsByCustomer'; 
import WelcomeComponent from './Components/WelcomeComponent';
import SaveRequestComponent from './Components/SaveRequestComponent';
import UpdateCustomerComponent from './Components/UpdateCustomerComponent';
import RequestDetail from './Components/RequestDetail';
import SignupComponent from './Components/SignupComponent';

function App() {

  return (
    <div className="App" style={  {
      backgroundImage: `url(/car.jpg)`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
      
  }}>
       <BrowserRouter>
      <div className='container'>
        <Headers />
        <Routes>
        <Route path='/' element={<WelcomeComponent />}> </Route>
        <Route path='/login' element={<LoginComponent />} ></Route> 
        <Route path='/signup' element={<SignupComponent />}></Route>
        <Route path= '/logout' element= {< LogoutComponent />}></Route>
          
          <Route path='/all-cars' element={<ListCarsComponent />}> </Route>
          <Route path='/all-cars/:available' element={<ListCarsComponent />}> </Route>

          <Route path='/add-car' element={<SaveCarComponent />}></Route>
          <Route path='/update-car/:id' element={<SaveCarComponent/>}></Route>

          <Route path='/update-request/:id' element={<SaveRequestComponent/>}></Route>

          <Route path='/all-requests' element={<ListRequestsByCondition />}></Route>
          <Route path='/all-requests/:submitted' element={<ListRequestsByCondition />}></Route>
          <Route path='/requests-customer' element={<ListRequestsByCustomer />}></Route>
          <Route path='/request-detail/:requestId' element={<RequestDetail />}></Route>
          <Route path='/make-request/:carId/:customerId' element={<MakeRequestComponent />}></Route> 

          <Route path='/update-customer/:id' element={<UpdateCustomerComponent />}></Route>     
         
        </Routes>
      </div>
    </BrowserRouter>

    </div>
  );
}

export default App;
