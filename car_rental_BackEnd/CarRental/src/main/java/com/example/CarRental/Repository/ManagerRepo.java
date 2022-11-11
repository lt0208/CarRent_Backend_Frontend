package com.example.CarRental.Repository;

import com.example.CarRental.Model.Customer;
import com.example.CarRental.Model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerRepo extends JpaRepository<Manager, Long> {
    @Query("select m from Manager m where m.username = ?1")
    Manager findByUsername(String username);

    @Query("select (count(m) > 0) from Manager m where m.username = ?1")
    boolean existsByUsername(String username);

}
