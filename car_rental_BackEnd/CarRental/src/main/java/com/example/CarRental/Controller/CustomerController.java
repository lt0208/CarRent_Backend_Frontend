package com.example.CarRental.Controller;
import com.example.CarRental.Model.Customer;
import com.example.CarRental.Service.CustomerService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/customers")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping()
    public List<Customer> getAllCustomer(){
        return customerService.getAllCustomers();
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/current")
    public ResponseEntity getCurrentCustomer(Principal principal){
        try{Customer customer = customerService.getCustomerByUsername(principal.getName());
            return ResponseEntity.ok(customer);}
        catch (Exception e) {
            return  ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/{id}")
    public ResponseEntity getCustomerById(@PathVariable Long id){
        try{
            return ResponseEntity.ok(customerService.getCustomerById(id));}
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/info/{id}")
    public ResponseEntity getCustomerInfoById(@PathVariable Long id){
        try{
            Customer customer = customerService.getCustomerById(id);
            CustomerInfo customerInfo = new CustomerInfo(customer.getFirstname()
                    , customer.getLastname()
                    ,customer.getEmail()
                    ,customer.getCompletedRentals());
            return ResponseEntity.ok(customerInfo);}
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @PutMapping("/update") // the identity of the customer can be retrieved from Principal
    public ResponseEntity updateCustomer(@RequestBody Customer customerDetail, Principal principal){
        try{
            String username = principal.getName();
            Customer customer = customerService.getCustomerByUsername(username);
            customer.setFirstname(customerDetail.getFirstname());
            customer.setLastname(customerDetail.getLastname());
            customer.setEmail(customerDetail.getEmail());
            customerService.saveCustomer(customer);
            return ResponseEntity.ok(customer);
        }catch (Exception e) {
            return  ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }

    }
    @PostMapping("/add") //this method is replaced by signupCustomer function in AuthenticationController
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer){
        customerService.saveCustomer(customer);
        return ResponseEntity.ok(customer);
    }

    @PreAuthorize("hasRole('MANAGER')") // This function is not actually used in any case.
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteCustomer(@PathVariable Long id){
        try{
            customerService.deleteCustomerById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e) {
            return  ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}
@Getter
@Setter
@AllArgsConstructor
class CustomerInfo{
    private String firstName;
    private String lastName;
    private String email;
    private int completedRentals;
}
