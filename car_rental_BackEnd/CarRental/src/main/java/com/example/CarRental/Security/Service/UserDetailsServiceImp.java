package com.example.CarRental.Security.Service;

import com.example.CarRental.Model.Customer;
import com.example.CarRental.Model.Manager;
import com.example.CarRental.Payload.Response.JwtResponse;
import com.example.CarRental.Repository.CustomerRepo;
import com.example.CarRental.Repository.ManagerRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImp implements UserDetailsService {
    @Autowired
    CustomerRepo customerRepo;
    @Autowired
    ManagerRepo managerRepo;
    Logger logger = LoggerFactory.getLogger(UserDetailsServiceImp.class);


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.warn("loadUserByUsername called");
        Customer customer = customerRepo.findByUsername(username);
        Manager manager = managerRepo.findByUsername(username);
        logger.warn("loadUserByUsername called 2");

        if (customer !=null && manager != null){
            logger.warn("loadUserByUsername called 3");

            throw new RuntimeException("The username exists both as customer and manager! Not Allowed in our system");
        }
        if (customer != null){
            logger.warn("loadUserByUsername called 4");

            UserDetailsImp c = new UserDetailsImp(
                    customer.getUsername(),
                    customer.getPassword(),

                    customer.getEmail(),
                    customer.getRole());

            return c;
        }
        if (manager != null){
            logger.warn("loadUserByUsername called 5");

            UserDetailsImp m = new UserDetailsImp(
                    manager.getUsername(),
                    manager.getPassword(),
                    manager.getEmail(),
                    manager.getRole());
            logger.warn("ManagerDetailsImp in loadUserByUsername");
            return m;
        }
        logger.warn("loadUserByUsername called 6");

        throw  new UsernameNotFoundException(username + " isn't found!");
    }
}
