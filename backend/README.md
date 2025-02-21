# Backend

## Dependencies
Spring Boot 3.4.2
Spring WebFlux + R2DBC
MySQL 8.0.40.
OAuth 2.0 + JWT

## Challenges
### 구현 전
* access token + refresh token을 이용한 인증 전략
  * access token을 메모리에 저장 - React Redux (Toolkit?)
  * Refresh token을 http cookie에 저장 - js에서 접근 불가
  * access token 만료 시 refresh token으로 재발급 시도
* 무중단 배포 - docker and nginx

### Reference
- [Backend Routing](https://github.com/springdoc/springdoc-openapi-demos/tree/master/demo-spring-boot-3-webflux-functional/src/main/java/org/springdoc/demo/app4)