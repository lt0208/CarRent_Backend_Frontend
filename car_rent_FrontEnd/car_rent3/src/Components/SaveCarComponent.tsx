import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CarService from '../services/CarService';
import Car from './Interfaces';
// this component isn't used. It was used to update status of request at a seperate page.
const SaveCarComponent = () => {
    const { id } = useParams() // the object property must be "id", the same as the path variable "id"
    const [carObj, setCarObj] = useState<Car>({
        id: -1,
        year: '',
        brand: '',
        model: '',
        price: 0,
        availability:'AVAILABLE'
    });
    const navigate = useNavigate();

    const saveChange = (e: React.MouseEvent<HTMLElement>) => {
        console.log(carObj)
        e.preventDefault();
        if (id) {
            CarService.updateCar(parseInt(id), carObj).then((Response: any) => { // CAN'T pass {id} to the function
                navigate("/all-cars")
            }).catch((e: any) => {
                window.alert("Error: "+e.message)
                console.log(e);
            }
            )
        } else {
            CarService.addCar(carObj).then((Response: any) => {
                navigate("/all-cars")
            })
        }
    }

    useEffect(

        () => {
            if (id) {
                CarService.getCarById(parseInt(id)).then((Response: any) => {
                    setCarObj(Response.data)
                    //console.log("-------------") // Be noted: often use console.log to see your current status and check the provious steps
                    console.log(carObj) // when I use const {  carId } = useParams(), this log didn't display anything!! So, remember to use console.log
                }).catch((e: any) => {
                    window.alert("Error: "+e.message)
                    console.log(e);
                }
                )
            }
        }, []
    )


    return (
        <div>
            {!id ? <h2>Add a new Car</h2> : <h2>Update car info</h2>}
            {!id || carObj.availability === "AVAILABLE" ?
            <form>
                <div  >
                    <label >Year
                        <input type="text" className="form-control" id="year" value={carObj.year}
                            onChange={e => setCarObj({ ...carObj, 'year': e.target.value })}></input> </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">Brand
                        <input type="text" className="form-control" value={carObj.brand} onChange={e => setCarObj({ ...carObj, 'brand': e.target.value })}></input>
                    </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">Model
                        <input type="text" className="form-control" value={carObj.model} onChange={e => setCarObj({ ...carObj, 'model': e.target.value })}></input>
                    </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">Price
                        <input type="text" className="form-control" value={carObj.price} onChange={e => setCarObj({ ...carObj, 'price': parseInt(e.target.value) })}></input>
                    </label>
                </div>
                <button className="btn btn-primary" onClick={saveChange}>Submit</button>
            </form> : <h2>This car is requested or in use, pls update when it's free!</h2>}
        </div>
    )
}

export default SaveCarComponent