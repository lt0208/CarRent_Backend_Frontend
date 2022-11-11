import CarService from "../services/CarService";
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Car from "./Interfaces";
import { Script } from "vm";

const ListCarsComponent = () => {
    const [carsList, setCarsList] = useState([]);
    const { available } = useParams();
    var tableRow = 0;
    var customerId = 3;

    const deletion = (id: number) => {
        if (window.confirm(`Are you sure to delete car ${id} ?`)){
            CarService.deleteCar(id).then((Response: any) => {
                window.alert("Car " + id+" has been deleted!");
                if (available) {
                    readAvailableCars();
                } else {
                    readAllCars();
                }
            }).catch((e: any) => {
                alert("Error: "+e.response.data) //return e.message is ok but not detail
                console.log(e);
            }            
            );// CAN'T pass {id} to the function

        }       

    }

    const CheckCarAvailability = (carId: number) =>{
        return CarService.getCarAvailability(carId);

    }

    const readAvailableCars = () => {
        CarService.getAllAvailableCars()
            .then((Response: any) => {
                setCarsList(Response.data)
                console.log("carsList: " + carsList + " response data: " + Response.data)
            }).catch((e: any) => {
                alert("Error: "+e.message) // we don't return e.response.data coz the data is empty
                console.log("Error: "+e.message);
            }            
            )
    }

    const readAllCars = () => {
        CarService.getAllCars()
            .then((Response: any) => {
                setCarsList(Response.data)
                console.log("carsList: " + carsList + " response data: " + Response.data)
            }).catch((e: any) => {
                
                alert("Error: "+e.message)
                console.log(e);
                
            }            
            )
    }

    useEffect(() => {
        if (available) {
            readAvailableCars();
        } else {
            readAllCars();
        }
    }, [])



    return (
        <div className="container"  >
            {!available && <Link className="btn btn-primary" to={"/add-car"}>Add New Car</Link>}
            <div id="alert"></div>

            <table className="table table-striped">
                <thead>
                    <tr> <th scope="col">#</th>
                        <th>Car Id</th>
                        <th>Year</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        carsList.map(
                            (car: Car) => {
                                return (
                                    //conditional expression should be outside of JSX, if statements can't be inside of the JSX,
                                    // or you could use a ternary expression in {} instead
                                    //or use && in {}
                                    <tr key={car.id}>
                                        <td scope="row">{++tableRow}</td>
                                        <td>{car.id}</td>
                                        <td>{car.year}</td>
                                        <td>{car.brand}</td>
                                        <td>{car.model}</td>
                                        <td>{car.price}</td>
                                        <td>{car.availability ==="AVAILABLE"? <p>AVAILABLE</p> : <p style={{color:"red"}}>{car.availability}</p>}</td>
                                       

                                        <td>
                                            {(available) && <Link className="btn btn-success" to={`/make-request/${car.id}/${customerId}`} >Request</Link>}

                                            {(!available) && <Link className="btn btn-primary" to={`/update-car/${car.id}`}>Update</Link>}

                                            {!available && <button className="btn btn-danger" onClick={() => {
                                                if (car.id) {
                                                    deletion(car.id)
                                                }
                                            }} >Delete</button>}

                                        </td>
                                    </tr>)
                            }
                        )
                    }

                </tbody>
            </table>
        </div>

    
    )
  
}

export default ListCarsComponent
