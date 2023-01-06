package com.security.demo.user;

// User data transfer object. This object stores all the data from a frontend user registration request to send to the backend. It gets added to the registration form model as an attribute.

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    // TODO for some reason this breaks the registration
//    @NotNull
//    @NotEmpty
    private String username;
    @NotNull
    @NotEmpty
    private String firstName;

    @NotNull
    @NotEmpty
    private String lastName;

    @NotNull
    @NotEmpty
    private String password;
    private String matchingPassword;

    // TODO create custom validation annotation https://www.baeldung.com/registration-with-spring-mvc-and-spring-security/# 5.2
    private UserRole userRole;

}
