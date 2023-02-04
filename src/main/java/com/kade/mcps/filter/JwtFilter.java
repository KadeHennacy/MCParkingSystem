package com.kade.mcps.filter;

import com.kade.mcps.config.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
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
    private final JwtService jwtUtil;
    private final UserDetailsService userDetailsService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
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
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null && jwtUtil.validateToken(token)) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                // Set the authentication object in the Spring Security context
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (ExpiredJwtException ex) {
            System.out.println(ex);
            String isRefreshToken = request.getHeader("isRefreshToken");
            String requestURL = request.getRequestURL().toString();
            // allow for Refresh Token creation if following conditions are true.
            if (isRefreshToken != null && isRefreshToken.equals("true") && requestURL.contains("refresh")) {
                allowForRefreshToken(ex, request);
            } else request.setAttribute("exception", ex);

        } catch (BadCredentialsException ex) {
            System.out.println(ex);
            request.setAttribute("exception", ex);
        } catch (Exception ex) {
            System.out.println(ex);
        }


        // Allow the request to continue through the filter chain
        chain.doFilter(request, response);
    }

    private void allowForRefreshToken(ExpiredJwtException ex, HttpServletRequest request) {

        // create a UsernamePasswordAuthenticationToken with null values.
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(null, null, null);
        // After setting the Authentication in the context, we specify
        // that the current user is authenticated. So it passes the
        // Spring Security Configurations successfully.
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        // Set the claims so that in controller we will be using it to create
        // new JWT
        request.setAttribute("claims", ex.getClaims());

    }

}

