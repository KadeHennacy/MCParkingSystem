package com.kade.mcps.user;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {


    // Take info from the registration form, encode password, save user in database
    User signUpUser(UserDto userDto);
}
