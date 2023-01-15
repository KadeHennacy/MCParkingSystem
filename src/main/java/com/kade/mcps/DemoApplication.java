package com.kade.mcps;
import com.kade.mcps.user.UserDto;
import com.kade.mcps.user.UserRole;
import com.kade.mcps.user.UserService;
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
			UserDto user = new UserDto("admin@gmail.com", "admin", "admin", "admin", "admin", UserRole.ADMIN);
			UserDto user2 = new UserDto("user@gmail.com", "user", "user", "user", "user", UserRole.USER);
			userService.signUpUser(user);
			userService.signUpUser(user2);
		};
	}
}
