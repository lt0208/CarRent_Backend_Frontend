import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CarService from '../services/CarService';
import CustomerService from '../services/CustomerService';
import RequestService from '../services/RequestService';
import * as React from 'react';
import Car, { Customer, Request } from './Interfaces';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';


const MakeRequestComponent = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { customerId } = useParams();
  const [dateRange, setDateRange] = React.useState<DateRange<Dayjs>>([null, null]);

  //console.log("carId " + carId + " customerId " + customerId)
  const [car, setCar] = useState<Car>({
    year: '',
    brand: '',
    model: '',
    price: 0,
    availability: ''
  });

  const [customer, setCustomer] = useState<Customer>({
    username: '',
    password: '',
    email: ''
  });
  const [request, setRequest] = useState<Request>({
    id: -1,
    status: '',
    dateCreated: '',
    startDate: '',
    endDate: '',
    car: {},
    customer: {}
  })

  const submitChange = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("car: " + JSON.stringify(car))
    console.log("customer: " + JSON.stringify(customer))

    if (dateRange[0] === null || dateRange[1] === null) {
      alert("pls select date")
    } else {
      console.log("****************")

      //console.log("date range: " + dateRange[0].format('YYYY-MM-DD') + " to " + dateRange[1].toDate())
      console.log("request: " + JSON.stringify(request))
      RequestService.makeRequest(request, parseInt(carId || "")).then((Response: any) => {
        console.log("+++++++++++")
        console.log("request: " + JSON.stringify(request) + "response data  " + Response.data)
        navigate('/requests-customer')
      }).catch((e: any) => {
        window.alert("Error: " + e.message)
        console.log(e);
      }
      )
    }

  }


  useEffect(() => {
    if (carId) {
      CarService.getCarById(parseInt(carId)).then((Response: any) => {
        setCar(Response.data);// it's not good to set the car obj of request here, if the below CustomerService did the same thing
        console.log("+++car: " + JSON.stringify(car) + " response data: " + Response.data)
      }).catch((e: any) => {
        window.alert("Error: " + e.message)
        console.log(e);
      }
      )
    }

    if (customerId) {
      CustomerService.getCurrentCustomer().then((Response: any) => {
        setCustomer(Response.data);// it's not good to set the customer obj of request here, if the above CarService did the same thing. 
        //Why? Two async fucntion modifying the same state isn't a good idea, I believe
        console.log("+++customer: " + JSON.stringify(customer) + " response data: " + Response.data)
      }).catch((e: any) => {
        window.alert("Error: " + e.message)
        console.log(e);
      }
      )
    }
  }, [])



  return (
    <div className='container'>MakeRequestComponent

      <form>
        <h1>Hi, {customer.firstname}, welcome to our car booking service!</h1>

        <div className='container'>
          <div>
            <h2>You are booking: {car.brand} - {car.model}</h2>
            {/*   <input type="text" placeholder="input date created" onChange={e => setRequest({

              status: 'SUBMITTED',
              dateCreated: e.target.value,
              startDate: '2020-10-05',
              endDate: '2020-11-06'

            })} ></input> */}
          </div>

          <div> 
            <BasicDateRangePicker dateRangeChild={dateRange} carChild={car} customerChild={customer} setDateRangeChild={setDateRange} setRequestChild={setRequest} />
          </div>
        </div>

        <button className='btn btn-primary' onClick={submitChange} >Submit</button>

      </form>
    </div>
  )

}


export function BasicDateRangePicker(props: any) {
  // this function copied from MUI X
  return (
    <div   style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  
    }}>
    <LocalizationProvider 
      dateAdapter={AdapterDayjs}
      localeText={{ start: 'Start Date', end: 'End Date' }}
    >
      <DateRangePicker 
     
        disablePast
        value={props.dateRangeChild} //the original code, actually this isn't used. I used newValue directly.
        onChange={(newValue: DateRange<Dayjs>) => {
          props.setDateRangeChild(newValue);
          if (newValue[0] !== null && newValue[1] !== null) {
            console.log("hi---------")
            props.setRequestChild({

              status: 'SUBMITTED',
              dateCreated: new Date().toLocaleDateString('en-CA'), // it works for Date class
              // dateCreated: new Date().format('YYYY-MM-DD') //it doesn't work for Date class

              startDate: newValue[0].format('YYYY-MM-DD'), // it works for Dayjs class
              endDate: newValue[1].format('YYYY-MM-DD'), // it works for Dayjs class
              // startDate: newValue[0].toLocaleDateString('en-CA'), // it doesn't work for Dayjs class
              //endDate: newValue[1].toLocaleDateString('en-CA'),// it doesn't work for Dayjs class
              /*  dateCreated:"10-03-2025",
                  startDate: "2025/10/01",
                  endDate:"10/11/2022", all will give wrong!! coz localdate in Java is defined as YYYY-MM-DD */
              "car": props.carChild,
              "customer": props.customerChild

            })
          }
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
    </div>
  );
}

export default MakeRequestComponent;

