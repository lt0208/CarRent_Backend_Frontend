import axios from "axios";
import Car,{RegisterPayload} from "../Components/Interfaces";



const AUTH_REST_API_URL = "http://localhost:8080/auth";
class AuthService {

    signin = (username: String, password: String) => {
        return axios.post(AUTH_REST_API_URL + "/signin", { username, password })
          .then((Response:any) => {
            if (Response.data.token){
                localStorage.setItem("user", JSON.stringify(Response.data));
                //Be noted: we have to pass string to server, response.data is string or obj? It is obviously an object! response obj.key;

            }
            return Response.data;            
          });           
    }

    signout = () => {
        localStorage.removeItem("user");

    }


    register = (registerPayload: RegisterPayload) => {
        return axios.post(AUTH_REST_API_URL + "/signup-customer", registerPayload);

    }

    getCurrentUser = () => {
        //Be noted, what is received from server is a String. And this function wants to return an obj
        //return JSON.parse(localStorage.getItem("user") || ""); // or "" can't be skipped, coz JSON.parse must expect a String.

        /**
         * Another way to handle JSON.parse expects string*/
        const currentUser = localStorage.getItem("user");
        if (typeof currentUser === "string"){
            return JSON.parse(currentUser);
        }
         

    }

}

export default new AuthService();