import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CustomerService from '../services/CustomerService';
import Car, { Customer } from './Interfaces';

const UpdateCustomerComponent = () => {
    const navigator = useNavigate();
    const { id } = useParams();
    const [customer, setCustomer] = useState<Customer>(
        {
            username: '',
            password: '',
            email: ''
        }
    )

    const saveChange = (e: any) => {
        e.preventDefault()
        CustomerService.updateCustomer(customer).then(() => {
            navigator("/requests-customer");
            // window.location.reload();

        }).catch(e => {
            window.alert("Error: " + e.message);
        })

    }

    useEffect(
        () => {
            console.log("customerId1 " + id);
            if (id) {
                console.log("customerId2 " + id);
                CustomerService.getCustomerById(parseInt(id)).then(
                    (Response: any) => {
                        setCustomer(Response.data)
                    }
                ).catch(e => {
                    window.alert("Error: "+e.message)

                    console.log(e.message)
                })

            }


        }, []
    )
    return (
        <div className='container'>
            <form>
                <div>
                    <label>First Name:
                        <input value={customer.firstName} type="text" className="form-control" onChange={e => { setCustomer({ ...customer, firstName: e.target.value }) }}></input>
                    </label>
                </div>
                <div>
                    <label>Last Name:
                        <input value={customer.lastName} type="text" className="form-control" onChange={e => { setCustomer({ ...customer, lastName: e.target.value }) }}></input>
                    </label>
                </div>

                <div>

                    <label>Email:
                        <input value={customer.email} type="text" className="form-control" onChange={e => { setCustomer({ ...customer, email: e.target.value }) }}></input>
                    </label>

                </div>

                <div>
                    <br></br>
                    <button className="btn btn-primary" onClick={e => saveChange(e)}>Save Change</button>

                </div>
            </form>
        </div>
    )
}

export default UpdateCustomerComponent