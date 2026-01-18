package com.fonishakaton.ReadRoom.Reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    @Autowired
    private ReservationRepository reservationRepository;
    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
    //rezervacija po id rezervacije
    @GetMapping("/{id}")
    public Reservation getReservationById(@PathVariable String id){
        return reservationRepository.findById(id).orElse(null);
    }
    @GetMapping("/{seatId}")
    public List<Reservation> getReservationBySeat(@PathVariable String seatId){
        return reservationRepository.findBySeatId(seatId);
    }
    @GetMapping("/{seatId}/{date}")
    public List<Reservation> getReservationsBySeatAndTime(@PathVariable String seatId, @PathVariable LocalDate date){
        return reservationRepository.findBySeatIdAndDate(seatId,date);
    }
    @GetMapping("/{roomid}")
    public List<Reservation> getreservationsByRoom(@PathVariable String roomid){
        return reservationRepository.findByRoomId(roomid);
    }
    @GetMapping("/{roomid}/{date}")
    public List<Reservation> getReservationsByRoomAndDate(@PathVariable String roomid, @PathVariable LocalDate date){
        return reservationRepository.findByRoomIdAndDate(roomid,date);
    }
    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationRepository.save(reservation);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable String id) {
        if (reservationRepository.existsById(id)) {
            reservationRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Reservation> markReservationAsShowedUp(@PathVariable String id) {
        return reservationRepository.findById(id)
                .map(reservation -> {
                    reservation.setShowedup(true);
                    reservationRepository.save(reservation);
                    return ResponseEntity.ok(reservation);
                })
                .orElse(ResponseEntity.notFound().build());
    }


}
