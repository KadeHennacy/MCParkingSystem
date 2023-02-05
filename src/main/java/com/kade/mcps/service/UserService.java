package com.kade.mcps.service;

import com.kade.mcps.entity.User;
import com.kade.mcps.payload.UserDto;

public interface UserService {


    // Take info from the registration form, encode password, save user in database
    User signUpUser(UserDto userDto);
}
