import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import RequestService from '../services/RequestService';
import Car,{Request} from './Interfaces';

const SaveRequestComponent = () => {
    const { id } = useParams() // the object property must be "id", the same as the path variable "id"
    const [requestObj, setRequestObj] = useState<Request>({
        id: 0,
        status: '',
        dateCreated: '',
        startDate: '',
        endDate: '',
        car: {},
        customer: {}
    });
    const navigate = useNavigate();

    const saveChange = (e: React.MouseEvent<HTMLElement>) => {
        console.log("requestObj:  "+JSON.stringify(requestObj))
        e.preventDefault();
        if (id) {
            RequestService.updateRequest(parseInt(id), requestObj).then((Response: any) => { // CAN'T pass {id} to the function
            //RequestService.approveRequest(parseInt(id)).then((Response :any) =>{    
            console.log("***requestObj:  "+JSON.stringify(requestObj))
                navigate("/all-requests")
            }).catch((e: any) => {
                window.alert("Error: "+e.message)
                console.log(e);
            }
            )
        } 
    }

    useEffect(

        () => {
            if (id) {
                RequestService.getRequestById(parseInt(id)).then((Response: any) => {
                    setRequestObj(Response.data)
                    console.log("-------------") // Be noted: often use console.log to see your current status and check the provious steps
                    console.log(JSON.stringify(requestObj)) // when I use const {  carId } = useParams(), this log didn't display anything!! So, remember to use console.log
                }).catch((e: any) => {
                    window.alert("Error: "+e.message)
                    console.log(e);
                }
                )
            }
        }, []
    )


    return (
        <div>SaveRequestComponent
            <form>
                <div  className="mb-3">
                    <label >status
                        <input type="text" className="form-control" id="status" value={requestObj.status}
                            onChange={e => setRequestObj({ ...requestObj, 'status': e.target.value })}></input> </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">startDate
                        <input type="text" className="form-control" value={requestObj.startDate} onChange={e => setRequestObj({ ...requestObj, 'startDate': e.target.value })}></input>
                    </label>
                </div>

                <div className='mb-3'>
                    <label className='form-label'>endDate
                      <input type="text" className="form-control" value={requestObj.endDate} onChange={e => setRequestObj({...requestObj,"endDate":e.target.value})}></input>
                    </label>
                </div>

            
                <button className="btn btn-primary" onClick={saveChange}>Submit</button>
            </form>
        </div>
    )
}

export default SaveRequestComponent