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
	annotationProcessor("org.projectlombok:lombok")

//	Database
	implementation("org.springframework.boot:spring-boot-starter-data-r2dbc")
	implementation("io.r2dbc:r2dbc-h2:1.0.0.RELEASE")
	testImplementation("io.r2dbc:r2dbc-h2:1.0.0.RELEASE")
	implementation("io.asyncer:r2dbc-mysql:1.3.2")

//	Spring Security
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.security:spring-security-oauth2-client:6.4.2")

//	Springdoc
	implementation("org.springdoc:springdoc-openapi-starter-webflux-ui:2.8.5")


//	Utils
	implementation("jakarta.validation:jakarta.validation-api:3.1.1")

}

tasks.withType<Test> {
	useJUnitPlatform()
}
