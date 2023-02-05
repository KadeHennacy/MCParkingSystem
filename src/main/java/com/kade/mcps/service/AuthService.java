package com.kade.mcps.service;

import com.kade.mcps.payload.AuthRequestDto;

public interface AuthService {
    String authenticate(AuthRequestDto request);

    String refresh(String token);
}
