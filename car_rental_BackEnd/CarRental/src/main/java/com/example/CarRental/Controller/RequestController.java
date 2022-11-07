package com.example.CarRental.Controller;

import com.example.CarRental.Exception.ResourceNotFoundException;
import com.example.CarRental.Model.*;
import com.example.CarRental.Repository.CarRepo;
import com.example.CarRental.Repository.CustomerRepo;
import com.example.CarRental.Repository.RequestRepo;
import com.example.CarRental.Service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/requests")
public class RequestController {
    @Autowired
    private RequestService requestService;

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    RequestRepo requestRepo;

    @Autowired
    CarRepo carRepo;

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/all")
    public List<Request> getAllRequests(){
        return requestService.getAllRequests();
    }

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/submitted")
    public List<Request> getAllSubmittedRequests(){
        return requestService.getSubmittedRequests();
    }

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/byId/{id}")
    public  ResponseEntity getRequestById(@PathVariable Long id){
        try{
            Request request = requestService.getRequestById(id);
            return ResponseEntity.ok(request);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/bycustomer")
    public ResponseEntity getRequestsOfCustomer(Principal principal){
        String username = principal.getName();
        try{
            return ResponseEntity.ok(requestService.getRequestsByUsername(username));
        } catch(Exception e){
            System.out.println("----------------");
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).
                    body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping("/make/{carId}")
    public ResponseEntity<Request> makeRequest(@RequestBody Request request, @PathVariable Long carId,  Principal principal){
        Customer customer = customerRepo.findByUsername(principal.getName());
        Car car = carRepo.findById(carId).orElseThrow(() -> new RuntimeException("Car was not found"));
        request.setStatus(RequestStatus.SUBMITTED);
        car.setAvailability(CarStatus.IN_REQUEST);
        request.setCustomer(customer);
        request.setCar(car);
        request.setDateCreated(LocalDate.now());
        requestService.saveRequest(request);
        return ResponseEntity.ok(request);
    }
    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/update/{requestId}")
    //Note: You probably HAVE TO pass @RequestBody Request requestDetail !! or will have 401 error!!Why?
    //Because you are using PutMapping!! Generally, you have to pass @RequestBody for PutMapping and PostMapping
    //Interestingly things:
    // 1. it still works in PostMan if omitting RequestBody and using PutMapping;
    //2. it still works in React if omitting @PreAuthorize("hasRole('...')")
    //3. it gives 401 error in React if omitting RequestBody and using PutMapping and PreAuthorize;
    public ResponseEntity updateRequest(@PathVariable Long requestId, @RequestBody Request requestDetail ){
        try {
            Request request = requestService.getRequestById(requestId);
            request.setStatus(requestDetail.getStatus());
            request.setStartDate(requestDetail.getStartDate());
            request.setEndDate(requestDetail.getEndDate());
            requestService.saveRequest(request);
            return ResponseEntity.ok(request);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @PreAuthorize("hasAnyRole('CUSTOMER','MANAGER')")
    @GetMapping("/handle/{requestId}/{statusId}")
    //A big problem I had here:
    //Firstly, I used @PutMapping("/handle/{requestId}/{statusId}") and @PreAuthorize("hasRole('CUSTOMER')"), and didn't pass @RequestBody Request requestDetail
    // it works in PostMan,and give 401 error in React. WHy? See above and below
    public ResponseEntity handleRequest(@PathVariable Long requestId, @PathVariable int statusId){
       try {
           return ResponseEntity.ok(requestService.changeStatus(requestId,statusId));

       }catch(Exception e) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
       }
    }
    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/approve/{requestId}")
    //A big problem I had here:
    //Firstly, I used @PutMapping("/handle/{requestId}/{statusId}") and @PreAuthorize("hasRole('CUSTOMER')"), and didn't pass @RequestBody
    // it works in PostMan,and give 401 error in React. WHy? See above
    //See this function, I passed  @RequestBody Request requestDetail and never used it. It's ok
    //So the key is: React + PreAuthorize + PutMapping forced you to pass @RequestBody
    public ResponseEntity approve(@PathVariable Long requestId,  @RequestBody Request requestDetail){

        try {
            Request request = requestRepo.findById(requestId).orElseThrow(
                    () -> new ResourceNotFoundException("can't find the request with id: "+requestId));
            request.setStatus(RequestStatus.APPROVED);
            requestService.saveRequest(request);
            return ResponseEntity.ok(request);

        }catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
