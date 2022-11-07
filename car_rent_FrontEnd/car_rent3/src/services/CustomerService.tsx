import axios from "axios";
import { Customer } from "../Components/Interfaces";
import authHeader from "./AuthorizationHeader";

const  Customer_REST_API_URL = "http://localhost:8080/customers";

class CustomerService{
    getCurrentCustomer(){
        return axios.get(Customer_REST_API_URL+"/current",  {headers: authHeader()})
    }

    updateCustomer(customerDeatil: Customer){
        return axios.put(Customer_REST_API_URL+"/update", customerDeatil, {headers: authHeader()})
        //update the current customer, so it has to login first!

    }

    getCustomerById(customerId:number){
        return axios.get(Customer_REST_API_URL+"/"+customerId, {headers: authHeader()})
    }

    getCustomerInfoById(customerId:number){
        return axios.get(Customer_REST_API_URL+"/info/"+customerId, {headers: authHeader()})
    }

    //addCustomer is replaced by register in AuthService
}

export default new CustomerService();