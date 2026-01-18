package com.example.demo.Room;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    @Autowired
    private RoomRepository roomRepository;

    @GetMapping
    public List<Room> getAllRooms(){
        return roomRepository.findAll();
    }
@GetMapping("/{id}")
    public Room getRoomById(String id){
        return roomRepository.findById(id).orElse(null);
    }

    @GetMapping("/{search}")
    public List<Room> searchRooms(@PathVariable String search) {
        return roomRepository.findByNameRegex(search);
    }
    @PostMapping
    public Room createRoom(@RequestBody Room room){
        return roomRepository.save(room);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable String id){
        if(roomRepository.existsById(id)){
            roomRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable String id, @RequestBody int zauzetaMesta){
        return roomRepository.findById(id)
                .map(room -> {
                    room.setZauzetaMesta(zauzetaMesta);
                    roomRepository.save(room);
                    return ResponseEntity.ok(room);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}