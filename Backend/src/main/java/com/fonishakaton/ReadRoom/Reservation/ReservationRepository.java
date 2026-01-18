package com.fonishakaton.ReadRoom.Reservation;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends MongoRepository<Reservation, String> {
    List<Reservation> findBySeatId(String seatId);
    List<Reservation> findBySeatIdAndDate(String seatId, LocalDate date);
    List<Reservation> findByRoomId(String roomId);
    List<Reservation> findByRoomIdAndDate(String roomId,LocalDate date);
    List<Reservation> findByShowedupFalseAndTimeBefore(LocalDateTime cutoff);
    long deleteByShowedupFalseAndTimeBefore(LocalDateTime cutoff);
}
