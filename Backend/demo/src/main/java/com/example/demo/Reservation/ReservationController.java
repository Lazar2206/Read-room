package com.example.demo.Reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private ReservationService reservationService;
    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
    //rezervacija po id rezervacije
    @GetMapping("/{id}")
    public Reservation getReservationById(@PathVariable String id){
        return reservationRepository.findById(id).orElse(null);
    }

    // reservation by seat id
    @GetMapping("/seat/{seatId}")
    public List<Reservation> getReservationBySeat(@PathVariable String seatId){
        return reservationRepository.findBySeatId(seatId);
    }
    public List<Reservation> getReservationsBySeatAndDate(@PathVariable String seatId, @PathVariable LocalDateTime date){
        return reservationRepository.findBySeatIdAndDate(seatId,date);
    }
    @GetMapping("/room/{roomId}")
    public List<Reservation> getReservationsByRoom(@PathVariable String roomId) {

        return reservationService.getReservationsByRoomId(roomId);
    }

    //    @GetMapping("/{roomid}")
//    public List<Reservation> getreservationsByRoom(@PathVariable String roomid){
//        return reservationRepository.findByRoomId(roomid);
//    }
//    @GetMapping("/{roomid}/{date}")
//    public List<Reservation> getReservationsByRoomAndDate(@PathVariable String roomid, @PathVariable LocalDate date){
//        return reservationRepository.findByRoomIdAndDate(roomid,date);
//    }
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
