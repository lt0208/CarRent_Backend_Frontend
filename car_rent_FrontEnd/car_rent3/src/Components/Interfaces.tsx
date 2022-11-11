export default interface Car{
     id?:number,
     year:string,
     brand:string,
     model:string,
     price:number,
     availability:string
}

export interface Customer{
    id?:number,
    firstname?:string,
    lastname?:string,
    username:string,
    password:string,
    email:string,
    completedRentals?:number
}

export interface CustomerInfo{
    
    firstName:string,
    lastName:string,   
    email:string,
    completedRentals:number
}

export interface RegisterPayload {
    username: string,
    password: string,
    email: string,
    firstname?: string,
    lastname?: string,
    completedRentals?: number,
    role: string
}

export interface Request{
    id: number,
    status: string,
    dateCreated:string,
    startDate:string,
    endDate:string,
    car:any,
    customer:any
   
}
// Be notes, the we used localDate class in Java, the formant is yyyy-mm-dd. so the format should be consistent