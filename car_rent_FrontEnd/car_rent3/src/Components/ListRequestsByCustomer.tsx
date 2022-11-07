/* eslint-disable no-unused-expressions */
import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import RequestService from '../services/RequestService'
import Car, { Customer, Request } from './Interfaces'
import CustomerService from '../services/CustomerService'
import ListRequestsComponent from './ListRequestsComponent'

const ListRequestsByCustomer = () => {

    const [requests, setRequests] = useState<Array<Request>>([]);
    const [customer, setCustomer] = useState<Customer>({
        username: '',
        password: '',
        email: ''
    });


    useEffect(() => {
        CustomerService.getCurrentCustomer().
            then((Response: any) => {
                setCustomer(Response.data)
                console.log(JSON.stringify(Response.data))
            }
            ).catch((e: any) => {
                console.log(e)
                alert("Error: " + e.message)
            })

        RequestService.getRequestsOfCustomer().
            then((Response: any) => {
                setRequests(Response.data)
                console.log(Response.data)
            }).catch((e: any) => {
                console.log(e)
                //alert("Error: " + e.message)
            })


    }, [])

    return (
        <div className="container">
            <div className="container" >
                <h4>Welcome, <strong>{customer.firstName} {customer.lastName}</strong></h4>
                <h4>Email: {customer.email}</h4> 
              
                <h4>Current credit: {customer.credit}</h4>
                <Link className='btn btn-primary' to={`/update-customer/${customer.id}`}>Update Profile</Link>

            </div>
            <div> {<ListRequestsComponent isCustomer={true} requests={requests} />} </div>

        </div>
    )
}
export default ListRequestsByCustomer;
