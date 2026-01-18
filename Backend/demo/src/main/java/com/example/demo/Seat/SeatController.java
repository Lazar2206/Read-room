package com.example.demo.Seat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/seats")
public class SeatController {
    @Autowired
    private SeatRepository seatRepository;

    @GetMapping
    public List<Seat> getAllSeats(){
        return seatRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seat> getSeatById(@PathVariable String id) {
        return seatRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Changed path to avoid collision with getSeatById
    @GetMapping("/room/{roomId}")
    public List<Seat> getSeatsByRoomId(@PathVariable String roomId){
        return seatRepository.findByRoomId(roomId);
    }

    @GetMapping("/room/{roomId}/free")
    public List<Seat> getFreeSeatsByRoomId(@PathVariable String roomId){
        List<Seat> seatsInRoom = seatRepository.findByRoomId(roomId);
        return seatsInRoom.stream().filter(seat -> !seat.isOccupied()).toList();
    }

    @PostMapping
    public ResponseEntity<Seat> createSeat(@RequestBody Seat seat){
        Seat saved = seatRepository.save(seat);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getId())
                .toUri();
        return ResponseEntity.created(location).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeat(@PathVariable String id) {
        if (seatRepository.existsById(id)) {
            seatRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Seat> updateSeat(@PathVariable String id, @RequestBody Seat seatDetails){
        return seatRepository.findById(id)
                .map(seat -> {
                    // update fields - only update known fields to avoid overwriting id
                    seat.setOccupied(seatDetails.isOccupied());
                    // if seat has other fields like roomId, update as needed
                    if (seatDetails.getRoomId() != null) {
                        seat.setRoomId(seatDetails.getRoomId());
                    }
                    Seat updated = seatRepository.save(seat);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
