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
        credit: 0
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
                        }
                    ).catch(e => window.alert(e.message))

                })
                .catch(e => window.alert(e.message))
        }

    }, []

    )

    return (

        <div>

            <div> <Typography align="left"><h5>Request Info</h5></Typography>
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
                        <td><strong>{requestObj.status}</strong></td>
                    </tbody>

                </table>
            </div>
            <br></br>


            <div><Typography align="left"><h5>Car Info</h5></Typography>
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
            <br></br>


            <div><Typography align="left"><h5>Customer Info</h5></Typography>
                <table className="table table-sm table-bordered border-primary">
                    <thead>
                        <th>Customer First Name</th>
                        <th>Customer Last Name</th>
                        <th>Customer Email</th>
                        <th>Customer Credit</th>
                    </thead>
                    <tbody>
                        <td>{customerInfo.firstName}</td>
                        <td>{customerInfo.lastName}</td>
                        <td>{customerInfo.email}</td>
                        <td>{customerInfo.credit}</td>
                    </tbody>
                </table>

            </div>

            {requestObj.status === "SUBMITTED" &&
                <button className='btn btn-success' onClick={() => {
                    if (requestObj.id) { changeStatus(requestObj.id, 1) }
                }}>Approve</button>}

            { requestObj.status === "SUBMITTED" &&
                <button className='btn btn-warning' onClick={() => {
                    if (requestObj.id) { changeStatus(requestObj.id, 3) }
                }}>Deny</button>}

            <Link className='btn btn-primary' to="/all-requests">Return to All Requests</Link>


        </div>
    )
}


export default RequestDetail