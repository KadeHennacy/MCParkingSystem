package com.kade.mcps.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final String TOKEN_PREFIX = "Bearer";
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // Check for the "Authorization" header in the request
        final String header = request.getHeader("Authorization");

        // If the header is not present or does not start with "Bearer ", allow the request to continue through the filter chain. Filter chains
        if (header == null || !header.startsWith("Bearer")) {
            chain.doFilter(request, response);
            return;
        }

        // Extract the JWT from the header
        final String token = header.substring(7);

        // Use the JWT library to decode the token and extract the user's identity and authorities
        final String userEmail = jwtUtil.extractUsername(token);

        // If a valid JWT was found, create a Spring Security authentication object
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
            if(jwtUtil.validateToken(token, userDetails)){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                // Set the authentication object in the Spring Security context
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Allow the request to continue through the filter chain
        chain.doFilter(request, response);
    }
}
