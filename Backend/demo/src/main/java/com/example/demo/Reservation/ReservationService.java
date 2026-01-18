package com.example.demo.Reservation;

import com.example.demo.Seat.Seat;
import com.example.demo.Seat.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getReservationsByRoomId(String roomId) {
        // Step 1: Find all tables in the room
        List<Seat> tables = seatRepository.findByRoomId(roomId);

        // Step 2: Extract table IDs
        List<String> tableIds = tables.stream()
                .map(Seat::getId)
                .toList();

        // Step 3: Find reservations for those tables
        return reservationRepository.findBySeatIdIn(tableIds);
    }
}