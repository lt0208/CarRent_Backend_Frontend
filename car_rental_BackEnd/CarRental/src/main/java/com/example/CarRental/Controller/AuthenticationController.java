package com.example.CarRental.Controller;

import com.example.CarRental.Model.Customer;
import com.example.CarRental.Payload.Request.CustomerSignupRequest;
import com.example.CarRental.Payload.Request.LoginRequest;
import com.example.CarRental.Payload.Response.JwtResponse;
import com.example.CarRental.Repository.CustomerRepo;
import com.example.CarRental.Repository.ManagerRepo;
import com.example.CarRental.Security.JWT.JwtUtils;
import com.example.CarRental.Security.Service.UserDetailsImp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/auth")
public class AuthenticationController {
    Logger logger = LoggerFactory.getLogger(AuthenticationController.class);
    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    ManagerRepo managerRepo;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity signin(@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImp UserDetails = (UserDetailsImp) authentication.getPrincipal();
        List<String> roles = UserDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt,UserDetails.getUsername(),roles));
    }

    @PostMapping("/signup-customer")
    public ResponseEntity signupCustomer(@Valid @RequestBody CustomerSignupRequest customerSignupRequest){
        if (customerRepo.existsByUsername(customerSignupRequest.getUsername())){
            throw new RuntimeException("User name already exists");
        }
        if (customerRepo.existsByEmail(customerSignupRequest.getEmail())){
            throw new RuntimeException("Email alreafy exists");
        }

        Customer customer = new Customer(customerSignupRequest.getUsername(), passwordEncoder.encode(customerSignupRequest.getPassword()),customerSignupRequest.getEmail());
        customerRepo.save(customer);
        return ResponseEntity.ok("Successfully registered");


    }


}
