package com.dodream.vintageFocus;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;

@RequiredArgsConstructor
public class JwtAuthenticationToken implements Authentication {
  private final String oauthId;
  private final String provider;
  private final String username;
  private final String role;
  private final boolean isRegistered;
  private boolean authenticated = true;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));
  }

  @Override
  public Object getCredentials() {
    return null;
  }
  @Override
  public Object getDetails() {
    return provider;
  }
  @Override
  public Object getPrincipal() {
    return oauthId;
  }

  @Override
  public boolean isAuthenticated() {
    return authenticated;
  }

  @Override
  public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
    this.authenticated = isAuthenticated;
  }

  @Override
  public String getName() {
    return username;
  }

  public boolean isRegistered() {
    return isRegistered;
  }
}
