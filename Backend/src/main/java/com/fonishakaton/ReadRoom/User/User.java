package com.fonishakaton.ReadRoom.User;

import com.fonishakaton.ReadRoom.Room.Room;
import com.fonishakaton.ReadRoom.Seat.Seat;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String passwordHash;
    private String lastName;
    private String email;
    private Room favoriteRoom;
    private Seat occupiedSeat=null;
}
