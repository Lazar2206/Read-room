package com.example.demo.User;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String password;
    private String lastName;
    private String email;
    private String favoriteRoomId;
    private String occupiedSeatId=null;
}
