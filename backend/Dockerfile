FROM gradle:jdk17 AS builder
WORKDIR /build
COPY build.gradle.kts settings.gradle.kts gradlew ./
COPY gradle ./gradle/
COPY src ./src/
RUN gradle build --parallel --continue

FROM amazoncorretto:17
WORKDIR /app

ARG JWT_SECRET_KEY
ARG PORTONE_API_KEY
ARG PORTONE_API_SECRET
ARG OAUTH_PROVIDERS
ARG SPRING_R2DBC_URL
ARG SPRING_R2DBC_PASSWORD

ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}
ENV PORTONE_API_KEY=${PORTONE_API_KEY}
ENV PORTONE_API_SECRET=${PORTONE_API_SECRET}
ENV OAUTH_PROVIDERS=${OAUTH_PROVIDERS}
ENV SPRING_R2DBC_URL=${SPRING_R2DBC_URL}
ENV SPRING_R2DBC_PASSWORD=${SPRING_R2DBC_PASSWORD}

COPY --from=builder /build/build/libs/*-SNAPSHOT.jar ./app.jar
EXPOSE 8094

ENTRYPOINT [ \
  "java",    \
  "-jar",    \
  "app.jar"  \
]