import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Car, { RegisterPayload } from "../Components/Interfaces";
import AuthService from '../services/AuthService';
import { useForm,SubmitHandler } from 'react-hook-form';

interface FormData  {
  username: String,
    password: string,
    email: string
   
};

const SignupComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterPayload>();
  const navigator = useNavigate();
  const [cusomer, setCustomer] = useState<RegisterPayload>({ //It's not required if using react-hook-form.check out saveCustomer2
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    credit: 0,
    role: "ROLE_CUSTOMER"
  })

  const saveCustomer = (e:any) => {//This method isn't used. Checkout saveCustomer2.
    e.preventDefault(); 
    AuthService.register(cusomer).then((Response: any) => {
      window.alert(Response.data+"! Please signin to rent a car!");
      navigator("/");
      window.location.reload();

    }).catch(e => {
      
      window.alert("Error: " + e.response.data)

      console.log("Error: " + e)
    })
  }

  const saveCustomer2: SubmitHandler<RegisterPayload> = (data:RegisterPayload) => {// we have to import SubmitHandler, with useForm
    console.log("22222222")
      console.log("data1: ",data)
      data.role= "ROLE_CUSTOMER"
      console.log("data2: ",data)

      AuthService.register(data).then((Response: any) => {
        window.alert(Response.data+"! Please signin to rent a car!");
        navigator("/login");
        window.location.reload();
  
      }).catch(e => {
        
        window.alert("Error: " + e.response.data)
  
        console.log("Error: " + e)
      })
      
  }

  const save3:SubmitHandler<FormData> = () =>{
    console.log("333333")
  }
 
  return (
  
    <div>
      <form onSubmit={handleSubmit(saveCustomer2)}>
        <div  >
          <label >Username:
            <input type="text" className="form-control"
              {...register("username", { required: true, minLength:3, maxLength:20 })}></input>          
          </label>
          {errors.username && <p style={{color:"red"}} >This field is required, minLength:3, maxLength:20</p>}
        </div>
        <div  >
          <label >Password:
            <input type="password" className="form-control"
              {...register("password", { required: true, minLength:4, maxLength:20 })}></input> 
          </label>
          {errors.password && <p style={{color:"red"}}>This field is required, minLength:4, maxLength:20</p>}
        </div>
        <div  >
          <label >Email:
            <input type="email" className="form-control"
              {...register("email", { required: true })}></input> 
          </label>
          {errors.email && <p style={{color:"red"}}>This field is required!</p>}
        </div>

        {/* <button className='btn btn-primary' onClick={e =>saveCustomer(e)}>Submit</button> */}
        <input type="submit" />

      </form>
    </div>
  )
}

export default SignupComponent