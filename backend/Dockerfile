FROM gradle:jdk17 AS builder
WORKDIR /build
COPY build.gradle.kts settings.gradle.kts gradlew ./
copy gradle ./gradle/
copy src ./src/
RUN gradle build --parallel --continue

FROM amazoncorretto:17
WORKDIR /app

COPY --from=builder /build/build/libs/*-SNAPSHOT.jar ./app.jar
EXPOSE 8094

ENTRYPOINT [ \
  "JAVA",    \
  "-JAR",    \
  "app.jar"  \
]