package com.example.CarRental.Model;

import jdk.jfr.Enabled;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Data
@RequiredArgsConstructor
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    private String role = "ROLE_MANAGER";

    public Manager(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
