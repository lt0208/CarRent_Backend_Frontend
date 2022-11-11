package com.example.CarRental.Model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Data
@RequiredArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 3, max=20)
    private String username;
    @NotBlank
    @Size(max = 120)
    private String password;
    private String firstname;
    private String lastname;
    @NotBlank
    @Email
    private String email;
    private int completedRentals = 0;

    private String role="ROLE_CUSTOMER";

    public Customer(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public Customer(String username,  String firstName, String lastName, String email,String password) {
        this.username = username;

        this.firstname = firstName;
        this.lastname = lastName;
        this.email = email;
        this.password = password;
    }

    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnore
    private Set<Request> requestSet;

    public void increaseCompletedRentals(){
        this.completedRentals++;
    }

}
