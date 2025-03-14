package com.dodream.vintageFocus.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.util.HashMap;
import java.util.Map;

public class DotenvEnvironmentPostProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        // Load the .env file
        Dotenv dotenv = Dotenv.configure()
                .directory(".") // Look for .env in the project root (adjust as needed)
                .ignoreIfMissing() // Don't fail if .env is missing
                .load();

        // Convert dotenv entries to a Map for Spring Boot property source
        Map<String, Object> dotenvProperties = new HashMap<>();
        dotenv.entries().forEach(entry -> {
            dotenvProperties.put(entry.getKey(), entry.getValue());
        });

        // Add the properties to Spring Boot's environment as a custom property source
        environment.getPropertySources().addFirst(
                new MapPropertySource("dotenvProperties", dotenvProperties)
        );
    }
}