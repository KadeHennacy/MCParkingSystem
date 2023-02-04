package com.kade.mcps.user;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


// Services are just classes that have some business functionality like math or smthn. This loads users from a database and registers users into the database
@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService{
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    // userRepository is an interface that is implemented and injected by Spring. It has all the CRUD operations for users in the database
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO change message to avoid revealing which users exist
        return userRepository.findByUsername(username).orElseThrow(() ->
                new UsernameNotFoundException("User with username " + username + " not found"));
    }

    // Take info from the registration form, encode password, save user in database
    @Override
    public User signUpUser(UserDto userDto) {
        boolean userExists = userRepository
                .findByUsername(userDto.getUsername())
                .isPresent();

        if (userExists) {
            throw new IllegalStateException("Username already taken");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(userDto.getPassword());
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setUsername(userDto.getUsername());
        user.setLastName(userDto.getLastName());
        user.setPassword(encodedPassword);
        user.setActive(true);
        // TODO Implement select for role type, maybe store roles as list
        user.setUserRole(userDto.getUserRole());
        userDto.setPassword(encodedPassword);

        userRepository.save(user);
        return user;
    }
}
