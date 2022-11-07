package com.example.CarRental.Payload.Request;

import lombok.Data;

@Data
public class LoginRequest {
    String username;
    String password;

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
