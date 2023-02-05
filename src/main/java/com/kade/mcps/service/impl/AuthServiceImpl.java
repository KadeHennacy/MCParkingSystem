package com.kade.mcps.service.impl;


import com.kade.mcps.auth.AuthenticationRequest;
import com.kade.mcps.config.JwtService;
import com.kade.mcps.entity.User;
import com.kade.mcps.repository.UserRepository;
import com.kade.mcps.entity.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// https://www.javainuse.com/webseries/spring-security-jwt/chap7
@Service
@RequiredArgsConstructor
public class AuthServiceImpl {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .username(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateAccessToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByUsername(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateAccessToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse refresh(String token) {
        try {
            jwtService.validateToken(token);
            String username = jwtService.extractUsername(token);
            User user = repository.findByUsername(username).orElseThrow();
            String newToken = jwtService.generateRefreshToken(user);
            return new AuthenticationResponse(newToken);
        } catch (ExpiredJwtException e) {
            Claims claims = e.getClaims();
            String username = claims.getSubject();
            User user = repository.findByUsername(username).orElseThrow();
            String newToken = jwtService.generateRefreshToken(user);
            return new AuthenticationResponse(newToken);
        }
    }

}

