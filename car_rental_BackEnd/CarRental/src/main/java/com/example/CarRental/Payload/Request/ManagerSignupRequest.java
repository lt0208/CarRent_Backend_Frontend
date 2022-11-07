package com.example.CarRental.Payload.Request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
@Data
public class ManagerSignupRequest {
    @NotBlank
    @Size(min = 3, max=20)
    private String username;

    @NotBlank
    @Size(max = 120)
    private String password;

    private String firstName;
    private String lastName;

    @NotBlank
    @Email
    private String email;

    public ManagerSignupRequest(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public ManagerSignupRequest(String username, String password, String firstName, String lastName, String email) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
