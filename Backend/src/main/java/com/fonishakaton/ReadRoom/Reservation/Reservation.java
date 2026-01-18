package com.fonishakaton.ReadRoom.Reservation;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@Document(collection = "reservations")
public class Reservation {
    @Id
    private String id;
    private String userId;
    private String seatId;
    private LocalDateTime time;
    private boolean showedup=false;
}
