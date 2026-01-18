package com.fonishakaton.ReadRoom.Seat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController("/api/seats")
public class SeatController {
    @Autowired
    private SeatRepository seatRepository;

    @GetMapping
    private List<Seat> getAllSeats(){
        return seatRepository.findAll();
    }
    @GetMapping("/{id}")
    private Seat getSeatById(@PathVariable String id) {
        return seatRepository.findById(id).orElse(null);
    }
    @GetMapping("/{roomId}")
    private List<Seat> getSeatsByRoomId(@PathVariable String roomId){
        return seatRepository.findByRoomId(roomId);
    }
    @GetMapping("/{roomId}/free")
    private List<Seat> getFreeSeatsByRoomId(@PathVariable String roomId){
        List<Seat> seatsInRoom = seatRepository.findByRoomId(roomId);
        return seatsInRoom.stream().filter(seat -> !seat.isOccupied()).toList();
    }
    @PostMapping
    private Seat createSeat(Seat seat){
        return seatRepository.save(seat);
    }
    @DeleteMapping("/{id}")
    private ResponseEntity<Void> deleteSeat(@PathVariable String id) {
        if (seatRepository.existsById(id)) {
            seatRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}")
    private ResponseEntity<Seat> updateSeat(@PathVariable String id, @RequestBody boolean isOccupied){
        return seatRepository.findById(id)
                .map(seat -> {
                    seat.setOccupied(isOccupied);
                    seatRepository.save(seat);
                    return ResponseEntity.ok(seat);
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
