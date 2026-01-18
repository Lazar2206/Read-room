package com.fonishakaton.ReadRoom.Reservation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Component
public class ReservationCleanupService {
    private static final Logger logger = LoggerFactory.getLogger(ReservationCleanupService.class);
    private final ReservationRepository reservationRepository;

    public ReservationCleanupService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    // Run every minute
    @Scheduled(fixedRate = 60000)
    public void cleanupNoShowReservations() {
        LocalDateTime cutoff = LocalDateTime.now(ZoneId.systemDefault()).minusMinutes(30);
        long deleted = reservationRepository.deleteByShowedupFalseAndTimeBefore(cutoff);
        if (deleted == 0) {
            logger.debug("No no-show reservations to delete (cutoff={})", cutoff);
            return;
        }
        logger.info("Deleted {} reservations that did not show up before {}", deleted, cutoff);
    }
}
