package com.dodream.vintageFocus.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
  info = @Info(
    title= "Vintage Focus Backend",
    version = "0.0.1",
    description = "Documentation APIs"
  )
)
public class SwaggerConfig {
}
