package com.kade.mcps;
import com.kade.mcps.payload.UserDto;
import com.kade.mcps.entity.Role;
import com.kade.mcps.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	//For testing after the application starts
	@Bean
	CommandLineRunner commandLineRunner(UserService userService){
		return args -> {
			UserDto user = new UserDto("admin@gmail.com", "admin", "admin", "admin", "admin", Role.ADMIN);
			UserDto user2 = new UserDto("user@gmail.com", "user", "user", "user", "user", Role.USER);
			userService.signUpUser(user);
			userService.signUpUser(user2);
		};
	}
}
