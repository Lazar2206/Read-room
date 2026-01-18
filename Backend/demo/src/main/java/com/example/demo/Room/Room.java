package com.example.demo.Room;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "rooms")
public class Room {
    @Id
    private String id;
    private String name;
    private String adress;
    private double latitude;
    private double longitude;
    private int brMesta;
    private int zauzetaMesta;

    // explicit setter to match controller usage
    public void setZauzetaMesta(int zauzetaMesta) {
        this.zauzetaMesta = zauzetaMesta;
    }
}
