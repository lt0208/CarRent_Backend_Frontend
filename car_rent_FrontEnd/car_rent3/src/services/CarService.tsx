import axios from "axios";
import Car from "../Components/Interfaces";
import authHeader from "./AuthorizationHeader";

const Car_REST_API_URL = "http://localhost:8080/cars";
//const Car_REST_API_URL = "http://carrentelasbean-env.eba-vnaxaib2.us-west-2.elasticbeanstalk.com/cars";
class CarService {
    getAllCars = () => {
        return axios.get(Car_REST_API_URL, {headers:authHeader()});
    }

    getAllAvailableCars=()=>{
        return axios.get(Car_REST_API_URL+"/available", {headers:authHeader()})
    }

    getCarById(id:number) {
        return axios.get(Car_REST_API_URL + '/' + id) // You CAN'T wrap id with {}, and CAN'T pass {id} either
    }

    updateCar(id:number, carDetail:Car) {
        console.log("authHeader: "+ authHeader())
        return axios.put(Car_REST_API_URL + "/update/" + id, carDetail, {headers:authHeader()}) // You CAN'T wrap id with {},and CAN'T pass {id} either
    }

    addCar(car:Car) {
        return axios.post(Car_REST_API_URL + "/add", car,{headers:authHeader()})
    }

    deleteCar(id:number) {
        return axios.delete(Car_REST_API_URL + "/delete/" + id, {headers:authHeader()}) // You CAN'T wrap id with {},and CAN'T pass {id} as parameter
    }

    getCarAvailability(id:number){
        return axios.get(Car_REST_API_URL + "/availability/" + id,{headers:authHeader()})
    }
}

export default new CarService();