package com.dodream.vintageFocus.config;

import com.dodream.vintageFocus.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
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
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@Configuration
@EnableWebFluxSecurity
@RequiredArgsConstructor
@EnableConfigurationProperties(OAuth2Config.class)
public class SecurityConfig implements WebFluxConfigurer {
  private final JwtAuthenticationFilter jwtAuthenticationFilter;


  @Bean
  public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }


  @Bean
  public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity security){
    return security
      .csrf(ServerHttpSecurity.CsrfSpec::disable)
      .cors(Customizer.withDefaults())
      .authorizeExchange(exchanges -> exchanges
        .pathMatchers(HttpMethod.GET, "/api/product/**").permitAll()
        .pathMatchers(HttpMethod.GET, "/swagger-ui/**", "/api-docs/**", "/favicon.ico").permitAll()
        .pathMatchers("/login/oauth2/**").permitAll()
        .pathMatchers("/oauth2/authorization/**").permitAll()
        .pathMatchers("/api/auth/signin").permitAll()
        .anyExchange().authenticated()
      )
//      .oauth2Login(oauth2 -> oauth2
//        .authenticationSuccessHandler(oAuth2SuccessHandler))
      .addFilterAt(jwtAuthenticationFilter, SecurityWebFiltersOrder.AUTHENTICATION)
      .build();
  }


  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedOrigins("http://localhost:3000")
      .allowedMethods("GET", "POST", "PUT", "DELETE")
      .allowedHeaders("*");
  }
}
