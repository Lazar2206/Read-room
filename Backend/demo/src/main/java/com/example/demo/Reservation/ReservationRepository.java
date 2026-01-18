package com.example.demo.Reservation;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends MongoRepository<Reservation, String> {
    // find reservations by seat id
    List<Reservation> findBySeatId(String seatId);
    List<Reservation> findBySeatIdAndDate(String seatId, LocalDateTime date);
    List<Reservation> findBySeatIdIn(List<String> seatIds);

    //  List<Reservation> findByRoomId(String roomId);
    //List<Reservation> findByRoomIdAndDate(String roomId,LocalDate date);
//    List<Reservation> findByShowedupFalseAndDateBefore(LocalDateTime cutoff);
//    long deleteByShowedupFalseAndTimeBefore(LocalDateTime cutoff);
}
