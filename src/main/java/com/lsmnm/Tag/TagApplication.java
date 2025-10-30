package com.lsmnm.Tag;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class TagApplication {

	public static void main(String[] args) {
		SpringApplication.run(TagApplication.class, args);
	}
}
