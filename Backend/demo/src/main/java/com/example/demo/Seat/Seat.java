package com.example.demo.Seat;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "seats")
public class Seat {
@Id
private String id;

private String roomId;
private String seatNumber;
private boolean isOccupied;
}
