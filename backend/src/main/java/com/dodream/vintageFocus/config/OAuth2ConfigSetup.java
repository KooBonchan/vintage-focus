package com.dodream.vintageFocus.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.EnumerablePropertySource;
import org.springframework.core.env.MutablePropertySources;
import java.io.IOException;
import java.util.Arrays;

@Configuration
@EnableConfigurationProperties(OAuth2Config.class)
public class OAuth2ConfigSetup {

    private final ConfigurableEnvironment environment;
    private final String oauth2ProvidersJson;

    public OAuth2ConfigSetup(ConfigurableEnvironment environment, 
                             @Value("${OAUTH2_PROVIDERS:}") String oauth2ProvidersJson) {
        this.environment = environment;
        this.oauth2ProvidersJson = oauth2ProvidersJson;
    }

    @PostConstruct
    public void init() throws IOException {
        if (!oauth2ProvidersJson.isEmpty()) {
            MutablePropertySources propertySources = environment.getPropertySources();
            // Add the JSON properties under the "oauth2" prefix to match @ConfigurationProperties
            propertySources.addFirst(new JsonEnvPropertySource("oauth2JsonProperties", oauth2ProvidersJson) {
                @Override
                public Object getProperty(String name) {
                    // Only handle properties that start with "oauth2"
                    if (name.startsWith("oauth2.")) {
                        return super.getProperty(name);
                    }
                    return null;
                }
            });
        }

    }
}