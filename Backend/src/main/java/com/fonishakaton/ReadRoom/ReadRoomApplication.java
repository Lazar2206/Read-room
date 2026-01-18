package com.fonishakaton.ReadRoom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ReadRoomApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReadRoomApplication.class, args);
	}

}
