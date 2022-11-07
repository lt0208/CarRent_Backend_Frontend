import axios from "axios";
import { Request } from "../Components/Interfaces";
import authHeader from "./AuthorizationHeader";
const REQUESTS_REST_API_URL = "http://localhost:8080/requests";

class RequestService {
    getAllRequests() {
        return axios.get(REQUESTS_REST_API_URL + "/all",{headers:authHeader()});
    }

    getAllSubmittedRequests() {
        return axios.get(REQUESTS_REST_API_URL + "/submitted", {headers:authHeader()})
    }

    getRequestById(requestId: number){
        return axios.get(REQUESTS_REST_API_URL + "/byId/"+requestId, {headers:authHeader()})
    }

    getRequestsOfCustomer() {
        return axios.get(REQUESTS_REST_API_URL + "/bycustomer",{headers:authHeader()}) // You CAN'T wrap id with {},and CAN'T pass {id} either
    }

    makeRequest(request: any, carId: number) {
        return axios.post(REQUESTS_REST_API_URL + "/make/"+carId, request, {headers:authHeader()})
    }

    updateRequest(id:number, requestDetail:Request) {
        console.log("authHeader: "+ authHeader())
        return axios.put(REQUESTS_REST_API_URL + "/update/" + id,requestDetail, {headers:authHeader()}) // You CAN'T wrap id with {},and CAN'T pass {id} either
    }

    handleRequest(requestId: number, statusId: number) { 
        console.log("++id: " + requestId + " ++statusID: " + statusId)
        return axios.get(REQUESTS_REST_API_URL+"/handle/"+requestId+"/"+statusId, {headers:authHeader()} ) 
        // You CAN'T wrap id with {},and CAN'T pass {id} either
        // Note: it's difficult to pass a enum parameter, so I modify the backend code to let it take int statusId as path variable!!
    }

    approveRequest(requestId: number, requestDetail: Request){
        return axios.put(REQUESTS_REST_API_URL + "/approve/" + requestId, requestDetail, {headers:authHeader()})
    }

}

export default new RequestService();