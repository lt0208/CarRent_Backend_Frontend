/* eslint-disable no-unused-expressions */
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, Suspense, useRef } from 'react'
import RequestService from '../services/RequestService'
import { useNavigate } from 'react-router-dom'
import ListRequestsComponent from './ListRequestsComponent'


interface Request {
    id: number,
    status: string,
    dateCreated: string,
    startDate: string,
    endDate: string,
    car: any,
    customer: any

}

const ListRequestsByCondition = () => {

    const { submitted } = useParams();
    const [requests, setRequests] = useState<Array<Request>>([]);
    const[request, setRequest] = useState<Request>({
        id: 0,
        status: '',
        dateCreated: '',
        startDate: '',
        endDate: '',
        car: {},
        customer: {}
    });
    const navigate = useNavigate();


    useEffect(() => {
        console.log("submitted " + submitted)
        if (submitted) {
            RequestService.getAllSubmittedRequests().then((Response: any) => {
                setRequests(Response.data)
            }).catch((e: any) => {
                console.log(e)
                window.alert("Error: "+e.message)

            })

        } else {
            RequestService.getAllRequests().then((Response: any) => {
                setRequests(Response.data)
            }).catch((e: any) => {
                console.log(e)
                window.alert("Error: "+e.message)

            })
        }
    }, [])

    return (
        <div> {<ListRequestsComponent isCustomer={false} requests={requests}/> } </div> 
    )
}



export default ListRequestsByCondition;
