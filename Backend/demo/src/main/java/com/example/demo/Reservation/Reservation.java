package com.example.demo.Reservation;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "reservations")
public class Reservation {
    @Id
    private String id;
    private String userId;
    private String seatId;
    private LocalDateTime date;
    private boolean showedup=false;

    // explicit setter to match controller usage
    public void setShowedup(boolean showedup) {
        this.showedup = showedup;
    }
}
