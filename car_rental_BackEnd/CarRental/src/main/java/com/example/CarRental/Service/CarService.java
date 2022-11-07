package com.example.CarRental.Service;

import com.example.CarRental.Exception.ResourceNotFoundException;
import com.example.CarRental.Model.Car;
import com.example.CarRental.Repository.CarRepo;
import com.example.CarRental.Repository.RequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarService {
    @Autowired
    private CarRepo carRepo;
    @Autowired
    private RequestService requestService;

    public List<Car> getAllCars(){
       return carRepo.findAll();
    }

    public List<Car> getAllAvailableCars(){
        List<Car> allCars = carRepo.findAll();
        List<Car> allAvailableCars = new ArrayList<>();
        for (Car car: allCars){
            if (requestService.checkCarAvailability(car.getId())){
                allAvailableCars.add(car);
            }
        }
        return allAvailableCars;
    }

    public List<Car> getAllAvailableCars2(){
        List<Car> allCars = carRepo.findAll();
        return (List<Car>) allCars.stream().filter(each -> requestService.checkCarAvailability(each.getId()));
    }

    public Car getCarById(Long id){
        return carRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Car isn't found with id: "+id));
    }

    public void saveCar(Car car){
        carRepo.save(car);
    }

    public void deleteCarById(Long id) throws Exception {
        Car toDelete = carRepo.findById(id).orElseThrow(()->new ResourceNotFoundException(String.format("Car isn't found with %d, can't delete",id)));
        if (!requestService.deleteCarOk(id) ){
            throw new Exception(String.format("Can't delete car %d, it's being referenced by request",id));
        }
        carRepo.delete(toDelete);
    }
}
