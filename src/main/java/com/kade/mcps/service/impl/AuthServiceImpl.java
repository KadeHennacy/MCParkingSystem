package com.kade.mcps.service.impl;

import com.kade.mcps.entity.User;
import com.kade.mcps.payload.AuthRequestDto;
import com.kade.mcps.repository.UserRepository;
import com.kade.mcps.security.JwtTokenProvider;
import com.kade.mcps.service.AuthService;
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
public class AuthServiceImpl implements AuthService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

//    public String register(RegisterRequest request) {
//        var user = User.builder()
//                .firstName(request.getFirstname())
//                .lastName(request.getLastname())
//                .username(request.getEmail())
//                .password(passwordEncoder.encode(request.getPassword()))
//                .role(Role.USER)
//                .build();
//        repository.save(user);
//        var jwtToken = jwtTokenProvider.generateAccessToken(user);
//        return AuthenticationResponse.builder()
//                .token(jwtToken)
//                .build();
//    }

    @Override
    public String authenticate(AuthRequestDto request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = repository.findByUsername(request.getEmail()).orElseThrow();
        var jwtToken = jwtTokenProvider.generateAccessToken(user);
        return jwtToken;
    }

    @Override
    public String refresh(String token) {
        try {
            jwtTokenProvider.validateToken(token);
            String username = jwtTokenProvider.extractUsername(token);
            User user = repository.findByUsername(username).orElseThrow();
            String newToken = jwtTokenProvider.generateRefreshToken(user);
            return newToken;
        } catch (ExpiredJwtException e) {
            Claims claims = e.getClaims();
            String username = claims.getSubject();
            // If you can still use an expired token to authenticate via this refresh token then what's the point?
            // This line here authenticates them. If their permissions have changed, then it's applied at refresh
            User user = repository.findByUsername(username).orElseThrow();
            String newToken = jwtTokenProvider.generateRefreshToken(user);
            return newToken;
        }
    }

}

