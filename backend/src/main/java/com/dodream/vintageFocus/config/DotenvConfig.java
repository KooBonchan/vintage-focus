package com.dodream.vintageFocus.config;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;


@Configuration
@Slf4j
public class DotenvConfig {

    @PostConstruct
    public void loadDotenv() {
        Dotenv dotenv = Dotenv.configure()
                .directory(".") // Look for .env in the project root
                .ignoreIfMissing() // Don't fail if .env is missing
                .load();


        // Set the environment variables from .env into the system properties
        dotenv.entries().forEach(entry -> 
            System.setProperty(entry.getKey(), entry.getValue())
        );

    }
}