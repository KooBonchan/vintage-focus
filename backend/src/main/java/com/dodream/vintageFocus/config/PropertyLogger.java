package com.dodream.vintageFocus.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class PropertyLogger {

    @Bean
    public CommandLineRunner logProperties(Environment env) {
        return args -> {
            System.out.println("spring.r2dbc.url: " + env.getProperty("spring.r2dbc.url"));
            System.out.println("spring.r2dbc.username: " + env.getProperty("spring.r2dbc.username"));
            System.out.println("spring.r2dbc.password: " + env.getProperty("spring.r2dbc.password"));
        };
    }
}