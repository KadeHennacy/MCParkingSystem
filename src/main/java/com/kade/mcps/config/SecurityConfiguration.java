package com.kade.mcps.config;

import com.kade.mcps.filter.CustomAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.session.SessionManagementFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import com.kade.mcps.config.JwtAuthenticationEntryPoint;

import static com.kade.mcps.config.JwtConfigurer.jwtConfigurer;


// https://www.codejava.net/frameworks/spring-boot/spring-boot-security-authentication-with-jpa-hibernate-and-mysql
// This explains how to configure authorization without webSecurityConfigurerAdapter: https://www.javaguides.net/2022/08/spring-security-without-webSecurityconfigureradapter.html

//https://www.toptal.com/spring/spring-security-tutorial this is even better
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final AuthenticationProvider authenticationProvider;

    private final JwtAuthenticationEntryPoint authenticationEntryPoint;

    //TODO configure https channel security to protect against mitm attacks
    // https://medium.com/@rahulgolwalkar/pros-and-cons-in-using-jwt-json-web-tokens-196ac6d41fb4
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //this is the solution to the circular dependencies from https://github.com/spring-projects/spring-security/issues/10822#issuecomment-1036063319
        // https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter
        //https://blog.trifork.com/2022/02/25/getting-out-of-a-codependent-relationship-or-how-i-moved-to-a-healthy-component-based-spring-security-configuration/
        http
                .csrf()
                .disable()
                .cors()
                .and()
                .addFilterBefore(corsFilter(), SessionManagementFilter.class)
                .authorizeHttpRequests((authorize) ->
                        authorize.antMatchers("/api/v1/greetings")
                                .authenticated()
                                .antMatchers("/api/v1/auth/**", "/", "/index.html", "/static/**",
                                        "/*.ico", "/*.json", "/*.png")
                                .permitAll()
                                .antMatchers(HttpMethod.GET, "/**")
                                .permitAll()
                                .anyRequest()
                                .authenticated())
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(authenticationEntryPoint)
                ).sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .apply(jwtConfigurer());
//                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();

    }

    //This allows requests from localhost:3000 through
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    // based on https://blog.trifork.com/2022/02/25/getting-out-of-a-codependent-relationship-or-how-i-moved-to-a-healthy-component-based-spring-security-configuration/


}
class JwtConfigurer extends AbstractHttpConfigurer<JwtConfigurer, HttpSecurity> {

    public void configure(HttpSecurity builder) {
        AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
        builder.addFilterBefore(new CustomAuthenticationFilter(authenticationManager), UsernamePasswordAuthenticationFilter.class);
    }
    public static JwtConfigurer jwtConfigurer() {
        return new JwtConfigurer();
    }
}

