package com.example.CarRental.Payload.Response;

import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
@Data
public class JwtResponse {
    String token;
    String type = "Bearer";
    //Long id;
    String username;
    //String email;
    List<String> roles;

    //Logger logger = LoggerFactory.getLogger(JwtResponse.class);
    public JwtResponse(String token,  String username, List<String> roles) {
        //logger.info("JwtResponse: called");

        this.token = token;

        this.username = username;
        this.roles = roles;
        //logger.info("JwtResponse: ok");
    }
}
