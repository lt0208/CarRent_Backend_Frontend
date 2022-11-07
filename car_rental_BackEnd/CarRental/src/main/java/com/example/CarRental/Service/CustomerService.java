package com.example.CarRental.Service;

import com.example.CarRental.Exception.ResourceNotFoundException;
import com.example.CarRental.Model.Customer;
import com.example.CarRental.Payload.Request.CustomerSignupRequest;
import com.example.CarRental.Repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    public List<Customer> getAllCustomers() {
        return customerRepo.findAll();
    }

    public Customer getCustomerById(Long id) {
        return customerRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer isn't found with id: " + id));
    }

    public Customer getCustomerByUsername(String username) {
        Customer c = customerRepo.findByUsername(username);
        if (c == null) {
            throw new ResourceNotFoundException("Customer isn't found with username: " + username);
        }
        return c;
    }

    public void saveCustomer(Customer customer) {
        customerRepo.save(customer);
    }

    public void signupCustomer(CustomerSignupRequest customerSignupRequest) {
        if (customerRepo.existsByUsername(customerSignupRequest.getUsername())) {
            throw new RuntimeException("User name already exists");
        }
        if (customerRepo.existsByEmail(customerSignupRequest.getEmail())) {
            throw new RuntimeException("User email already exists");
        }

        Customer customer = new Customer(customerSignupRequest.getUsername(), passwordEncoder.encode(customerSignupRequest.getPassword()), customerSignupRequest.getEmail());
        customerRepo.save(customer);
    }

    public void deleteCustomerById(Long id) {
        Customer toDelete = customerRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException(String.format("Customer isn't found with %d, can't delete", id)));
        customerRepo.delete(toDelete);
    }
}
