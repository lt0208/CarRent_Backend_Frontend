import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import CustomerService from '../services/CustomerService';
import RequestService from '../services/RequestService';
import Car, { Request, Customer, CustomerInfo } from './Interfaces';
import { Typography } from '@mui/material';

const RequestDetail = () => {
    const { requestId } = useParams();
    const [requestObj, setRequestObj] = useState<Request>({
        id: -1,
        status: '',
        dateCreated: '',
        startDate: '',
        endDate: '',
        car: {},
        customer: {}
    });

    const [car, setCar] = useState<Car>({
        id: -1,
        year: '',
        brand: '',
        model: '',
        price: 0,
        availability: ''

    })

    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        firstName: '',
        lastName: '',
        email: '',
        completedRentals: 0
    })


    const changeStatus = (requestId: number, statusId: number) => {

        RequestService.handleRequest(requestId, statusId).then(
            (Response: any) => {
                //navigate("/");
                window.location.reload(); // an old fashion to refresh a page!!
                window.alert("Status changed!")
                console.log("id: " + requestId + "statusID: " + statusId + " request: " + JSON.stringify(Response))
            }
        ).catch((e: any) => {
            console.log("catch e" + e)
            window.alert(e)
        }
        )
    }

    useEffect(() => {
        if (requestId && typeof requestId == 'string') {
            RequestService.getRequestById(parseInt(requestId))
                .then(response => {
                    const request = response.data; // It executes immediately!! This is the key!!!!!!! 
                    setRequestObj(request); // It takes a little bit time!!
                    setCar(request.car) // use the const value of request rather than the state!!!

                    CustomerService.getCustomerInfoById(request.customer.id).then(// use the const value of request rather than the state!!!
                        (Response: any) => {
                            setCustomerInfo(Response.data);
                            console.log("setCustomerInfo(Response.data):  "+JSON.stringify(Response.data))
                        }
                    ).catch(e => window.alert(e.message))

                })
                .catch(e => window.alert(e.message))
        }

    }, []

    )

    return (

        <div>
<br></br>

            <div> <Typography align="left"><h4>Request Info</h4></Typography>
                <table className="table table-sm table-bordered border-primary">
                    <thead>

                        <th>Request Id</th>
                        <th>Request date</th>
                        <th>start date</th>
                        <th>End date</th>
                        <th>Request Status</th>
                    </thead>
                    <tbody>
                        <td>{requestObj.id}</td>
                        <td>{requestObj.dateCreated}</td>
                        <td>{requestObj.startDate}</td>
                        <td>{requestObj.endDate}</td>
                        <td style={{color:"red"}}>{requestObj.status}</td>
                    </tbody>

                </table>
            </div>
        

            <div><Typography align="left"><h4>Car Info</h4></Typography>
                <table className="table table-sm table-bordered border-primary">
                    <thead>
                        <th>Car Id</th>
                        <th>Year</th>
                        <th>Car Brand</th>
                        <th>Car Model</th>
                        <th>Price</th>
                        <th>Car Status</th>

                    </thead>
                    <tbody>
                        <td>{car.id}</td>
                        <td>{car.year}</td>
                        <td>{car.brand}</td>
                        <td>{car.model}</td>
                        <td>{car.price}</td>
                        <td>{car.availability}</td>

                    </tbody>

                </table>

            </div>
        

            <div><Typography align="left"><h4>Customer Info</h4></Typography>
                <table className="table table-sm table-bordered border-primary">
                    <thead>
                        <th>Customer First Name</th>
                        <th>Customer Last Name</th>
                        <th>Customer Email</th>
                        <th>Completed rentals</th>
                    </thead>
                    <tbody>
                        <td>{customerInfo.firstName}</td>
                        <td>{customerInfo.lastName}</td>
                        <td>{customerInfo.email}</td>
                        <td>{customerInfo.completedRentals}</td>
                    </tbody>
                </table>

            </div>

            {requestObj.status === "SUBMITTED" &&
                <button className='btn btn-success' onClick={() => {
                    if (requestObj.id) { changeStatus(requestObj.id, 1) }
                }}>Approve</button>} {'  '}

            {requestObj.status === "SUBMITTED" &&
                <button className='btn btn-warning' onClick={() => {
                    if (requestObj.id) { changeStatus(requestObj.id, 3) }
                }}>Deny</button>}  {'  '}

            {requestObj.status === "APPROVED" &&
                <button className='btn btn-primary' onClick={() => {
                    if (requestObj.id) { 
                        if (window.confirm("Are you sure the rent is done and return car for the customer?")){
                            changeStatus(requestObj.id, 4)
                        }
                         
                    }
                }}>Return (For Customer)</button>}

            <Link className='btn btn-secondary' to="/all-requests">Return to All Requests</Link>


        </div>
    )
}


export default RequestDetail