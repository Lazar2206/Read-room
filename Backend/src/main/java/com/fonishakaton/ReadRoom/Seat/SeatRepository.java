package com.fonishakaton.ReadRoom.Seat;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SeatRepository extends MongoRepository<Seat,String> {
List<Seat> findByRoomId(String roomId);
}
