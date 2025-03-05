package com.dodream.vintageFocus.config;

import com.dodream.vintageFocus.security.JwtAuthenticationFilter;
import com.dodream.vintageFocus.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtTokenProvider jwtTokenProvider;

  @Bean
  public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }


  @Bean
  public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity security){
    return security
      .csrf(ServerHttpSecurity.CsrfSpec::disable)
      .cors(Customizer.withDefaults())
      .authorizeExchange(exchanges -> exchanges
        .pathMatchers(HttpMethod.GET, "/product/**").permitAll()
        .pathMatchers(HttpMethod.GET, "/swagger-ui/**", "/api-docs/**", "/favicon.ico").permitAll()
        .anyExchange().authenticated()
      )
      .addFilterAt(new JwtAuthenticationFilter(jwtTokenProvider), SecurityWebFiltersOrder.AUTHENTICATION)
      .build();
  }



}
