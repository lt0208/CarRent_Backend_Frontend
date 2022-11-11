package com.example.CarRental.Service;

import com.example.CarRental.Exception.ResourceNotFoundException;
import com.example.CarRental.Model.Customer;
import com.example.CarRental.Repository.CustomerRepo;
import com.example.CarRental.Repository.ManagerRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ManagerRepo managerRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    Logger logger = LoggerFactory.getLogger(CustomerService.class);

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

    public void signupCustomer(Customer customerDetail) {
        logger.info("customer2 passed: "+customerDetail);
        if (customerRepo.existsByUsername(customerDetail.getUsername())) {
            throw new RuntimeException("User name already exists");
        }
        if (customerRepo.existsByEmail(customerDetail.getEmail())) {
            throw new RuntimeException("User email already exists");
        }
        if(managerRepo.existsByUsername(customerDetail.getUsername())){
            throw new RuntimeException("User name conflicts with manager name, not allowed in our system");
        }

        Customer customer = new Customer(customerDetail.getUsername(),customerDetail.getFirstname(),customerDetail.getFirstname(),customerDetail.getEmail(), passwordEncoder.encode(customerDetail.getPassword()) );
        customer.setFirstname(customerDetail.getFirstname());
        customer.setLastname(customerDetail.getLastname());
        customerRepo.save(customer);
    }

    public void deleteCustomerById(Long id) {
        Customer toDelete = customerRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException(String.format("Customer isn't found with %d, can't delete", id)));
        customerRepo.delete(toDelete);
    }
}
