package com.example.CarRental.Repository;

import com.example.CarRental.Model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepo extends JpaRepository<Request, Long> {
    @Query("select r from Request r where r.car.id = ?1")
    List<Request> findByCar_id(Long id);

    @Query("select r from Request r where r.customer.id = ?1")
    List<Request> findByCustomer_Id(Long id);


}
