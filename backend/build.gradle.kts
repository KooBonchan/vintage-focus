plugins {
	java
	id("org.springframework.boot") version "3.4.2"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "com.dodream"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

configurations {
	all {
		exclude(group = "commons-logging", module = "commons-logging")
	}
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
//	Spring Boot
	implementation("org.springframework.boot:spring-boot-starter-webflux")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("io.projectreactor:reactor-test")
	testImplementation("org.springframework.security:spring-security-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")

//	Lombok
	compileOnly("org.projectlombok:lombok")
	testCompileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	implementation("org.projectlombok:lombok-mapstruct-binding:0.2.0")

//	MapStruct
	implementation("org.mapstruct:mapstruct:1.6.3")
	implementation("org.mapstruct:mapstruct-processor:1.6.3")

//	Database
	implementation("org.springframework.boot:spring-boot-starter-data-r2dbc")
	implementation("io.r2dbc:r2dbc-h2:1.0.0.RELEASE")
	testImplementation("io.r2dbc:r2dbc-h2:1.0.0.RELEASE")
	implementation("io.asyncer:r2dbc-mysql:1.3.2")

//	Spring Security
	// google
	implementation("com.google.api-client:google-api-client:2.7.2")
	implementation("com.google.auth:google-auth-library-oauth2-http:1.33.1")

	implementation("org.springframework.boot:spring-boot-configuration-processor:3.4.2")
	implementation("org.springframework.boot:spring-boot-starter-security")
//	implementation("org.springframework.security:spring-security-oauth2-client:6.4.3")
	implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server:3.4.2")

	implementation("io.jsonwebtoken:jjwt-api:0.12.6")
	runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.6")
	runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.6")

	implementation("io.github.cdimascio:dotenv-java:3.2.0")



//	Springdoc
	implementation("org.springdoc:springdoc-openapi-starter-webflux-ui:2.8.5")


//	Utils
	implementation("jakarta.validation:jakarta.validation-api:3.1.1")

}

tasks.withType<Test> {
	useJUnitPlatform()
}
