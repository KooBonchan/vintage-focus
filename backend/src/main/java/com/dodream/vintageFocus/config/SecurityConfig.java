package com.dodream.vintageFocus.config;

import com.dodream.vintageFocus.security.JwtAuthenticationFilter;
import com.dodream.vintageFocus.security.JwtTokenProvider;
import com.dodream.vintageFocus.security.OAuth2SuccessHandler;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebFluxSecurity
@RequiredArgsConstructor
@EnableConfigurationProperties(OAuth2Config.class)
public class SecurityConfig implements WebFluxConfigurer {
  private final OAuth2SuccessHandler oAuth2SuccessHandler;
  private final JwtTokenProvider jwtTokenProvider;

  @Bean
  public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

  @Bean
  public ReactiveJwtDecoder reactiveJwtDecoder() {
    return NimbusReactiveJwtDecoder.withSecretKey(
      Keys.hmacShaKeyFor(
        Decoders.BASE64.decode(
          jwtTokenProvider.getSecretKeyBase64()
        )
      )
    ).build();
  }

  @Bean
  public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity security){
    return security
      .csrf(ServerHttpSecurity.CsrfSpec::disable)
      .cors(Customizer.withDefaults())
      .authorizeExchange(exchanges -> exchanges
        .pathMatchers(HttpMethod.GET, "/product/**").permitAll()
        .pathMatchers(HttpMethod.GET, "/swagger-ui/**", "/api-docs/**", "/favicon.ico").permitAll()
        .pathMatchers("/login/oauth2/**").permitAll()
        .pathMatchers("/oauth2/authorization/**").permitAll()
        .pathMatchers("/api/auth/**").permitAll()
        .anyExchange().authenticated()
      )
//      .oauth2Login(oauth2 -> oauth2
//        .authenticationSuccessHandler(oAuth2SuccessHandler))
      .oauth2ResourceServer(oauth2 -> oauth2
        .jwt(jwt -> jwt
          .jwtAuthenticationConverter(jwtAuthenticationConverter()))
      )
      .addFilterAt(new JwtAuthenticationFilter(jwtTokenProvider), SecurityWebFiltersOrder.AUTHENTICATION)
      .build();
  }

  private Converter<Jwt, Mono<AbstractAuthenticationToken>> jwtAuthenticationConverter() {
    return jwt -> Mono.just(
      new JwtAuthenticationToken(
        jwt,
        extractAuthorities(jwt)
      )
    );
  }
  private Collection<GrantedAuthority> extractAuthorities(Jwt jwt) {
    try {
      // Extract roles or scopes from JWT claims
      List<String> roles = jwt.getClaimAsStringList("roles");
      List<String> scopes = jwt.getClaimAsStringList("scope");

      List<GrantedAuthority> authorities = new ArrayList<>();

      if (roles != null) {
        authorities.addAll(
          roles.stream()
            .map(role -> new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
            .toList()
        );
      }

      if (scopes != null) {
        authorities.addAll(
          scopes.stream()
            .map(SimpleGrantedAuthority::new)
            .toList()
        );
      }

      return authorities;
    } catch (Exception e) {
      // Log the exception
      return Collections.emptyList();
    }
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedOrigins("http://localhost:3000")
      .allowedMethods("GET", "POST", "PUT", "DELETE")
      .allowedHeaders("*");
  }
}
