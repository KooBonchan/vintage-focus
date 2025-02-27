package com.dodream.vintageFocus.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
  @Bean
  public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity security){
    return security
      .csrf(ServerHttpSecurity.CsrfSpec::disable)
      .cors(Customizer.withDefaults())
      .authorizeExchange(exchanges -> exchanges
        .pathMatchers(HttpMethod.GET, "/swagger-ui/**", "/api-docs/**", "/favicon.ico").permitAll()
        .anyExchange().authenticated()
      )
      .build();
  }


  @Bean
  public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

}
