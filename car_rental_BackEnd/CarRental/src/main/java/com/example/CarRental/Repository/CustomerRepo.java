package com.example.CarRental.Repository;

import com.example.CarRental.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {
    @Query("select c from Customer c where c.username = ?1")
    Customer findByUsername(String username);

    @Query("select (count(c) > 0) from Customer c where c.username = ?1")
    boolean existsByUsername(String username);

    @Query("select (count(c) > 0) from Customer c where c.email = ?1")
    boolean existsByEmail(String email);

}
