package com.example.CarRental.Model;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   @Enumerated(EnumType.STRING)// so db will save the string rather than index of the enum
    private RequestStatus status;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateCreated;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private Car car;

    public Request(LocalDate startDate, LocalDate endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Request(RequestStatus status, LocalDate startDate, LocalDate endDate) {
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
