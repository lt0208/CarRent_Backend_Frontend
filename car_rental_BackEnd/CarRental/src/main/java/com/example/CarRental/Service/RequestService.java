package com.example.CarRental.Service;

import com.example.CarRental.Exception.ResourceNotFoundException;
import com.example.CarRental.Model.*;
import com.example.CarRental.Repository.CarRepo;
import com.example.CarRental.Repository.CustomerRepo;
import com.example.CarRental.Repository.RequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequestService {
    @Autowired
    private RequestRepo requestRepo;
    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private CarRepo carRepo;

    public void saveRequest(Request request){
        requestRepo.save(request);
    }

    public List<Request> getAllRequests(){
        return requestRepo.findAll();
    }

    public List<Request> getSubmittedRequests(){
        List<Request> allRequests = requestRepo.findAll();
        return  allRequests.stream().filter(each -> each.getStatus() == RequestStatus.SUBMITTED).collect(Collectors.toList());
    }

    public List<Request> getRequestsByCustomerId(Long id){
        if (customerRepo.findById(id).isEmpty()){
            throw new ResourceNotFoundException("Customer isn't found with id: "+id);
        }
        List<Request> requestList = requestRepo.findByCustomer_Id(id);
        if (requestList == null){
            throw new ResourceNotFoundException("No request found by customer with id: "+id);
        }
        return requestList;
    }

    public List<Request> getRequestsByUsername(String username){
         Customer customer = customerRepo.findByUsername(username);
         if (customer == null){
            throw new ResourceNotFoundException("Customer isn't found username: "+username);
        }
        List<Request> requestList = requestRepo.findByCustomer_Id(customer.getId());
        if (requestList == null){
            throw new ResourceNotFoundException("No request found by customer with username: "+username);
        }
        return requestList;
    }

    public Request getRequestById(Long id){
        return requestRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("can't find the request with id: "+id));
    }

    public boolean checkCarAvailability(Long carId){
        List<Request> requests = requestRepo.findByCar_id(carId);
        for (Request request : requests) {
            if (request.getStatus().equals(RequestStatus.SUBMITTED)|| request.getStatus().equals(RequestStatus.APPROVED)
            ){
                return false;
            }
        }
        return true;
    }

    public boolean checkCarAvailability2(Long carId){
        List<Request> requests = requestRepo.findByCar_id(carId);
        return !requests.stream().anyMatch(request -> (request.getStatus() == RequestStatus.SUBMITTED || request.getStatus() == RequestStatus.APPROVED));
    }

    public boolean deleteCarOk(Long carId){
        List<Request> requests = requestRepo.findByCar_id(carId);
        if (requests == null || requests.size() == 0){
            return true;
        }
        return false;
    }

    public Request changeStatus(Long requestId, int statusId) throws Exception {
        Request request = requestRepo.findById(requestId).orElseThrow(
                () -> new ResourceNotFoundException("can't find the request with id: "+requestId));
        Car car = request.getCar();
        Customer customer = request.getCustomer();
       switch (statusId){
           case 0:
               request.setStatus(RequestStatus.SUBMITTED);
               car.setAvailability(CarStatus.IN_REQUEST);

               break;
           case 1:
               request.setStatus(RequestStatus.APPROVED);
               car.setAvailability(CarStatus.IN_USE);
               break;
           case 2:
               request.setStatus(RequestStatus.CANCELED);
               car.setAvailability(CarStatus.AVAILABLE);
               break;
           case 3:
               request.setStatus(RequestStatus.DENIED);
               car.setAvailability(CarStatus.AVAILABLE);
               break;
           case 4:
               request.setStatus(RequestStatus.RETURNED);
               customer.increaseCompletedRentals();
               customerRepo.save(customer);
               car.setAvailability(CarStatus.AVAILABLE);
               break;
           default:
               throw new Exception("Status value is not valid!");

       }


        //request.setStatus(status);// Alternative: pass enum directly. works in postman but not in React. when passing enum in postman, just give the value, e.g. "APPROVED", skip {}
        carRepo.save(car);
        return requestRepo.save(request);

    }

}
