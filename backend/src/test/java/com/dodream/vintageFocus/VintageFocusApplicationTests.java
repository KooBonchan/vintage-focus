package com.dodream.vintageFocus;

import com.dodream.vintageFocus.config.OAuth2Config;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
class VintageFocusApplicationTests {

	@Autowired
	private OAuth2Config oauth2Config;

	@Value("${JWT_SECRET_KEY}")
	private String jwtSecretKey;
	@Value("${PORTONE_API_KEY}")
	private String portoneApiKey;
	@Value("${PORTONE_API_SECRET}")
	private String portoneApiSecret;

	@Test
	void contextLoads() {
	}

	@Test
	void oauth2ConfigLoadsTest(){
		log.info("google client id: {}", maskSensitiveData(oauth2Config.google().clientId()));
		log.info("google client secret: {}", maskSensitiveData(oauth2Config.google().clientSecret()));
		log.info("google token exchange url: {}", oauth2Config.google().tokenUrl());
	}

	@Test
	void dotenvTest() {
		log.info("JWT key loaded: {}", maskSensitiveData(jwtSecretKey));
		log.info("Portone API key loaded: {}", maskSensitiveData(portoneApiKey));
		log.info("Portone API secret loaded: {}", maskSensitiveData(portoneApiSecret));
	}

	// Helper method to mask sensitive data
	private String maskSensitiveData(String data) {
		if (data == null || data.isEmpty()) {
			return "[NOT_LOADED]";
		}
		// Show only the first 4 characters (if available) and mask the rest
		int visibleLength = Math.min(4, data.length());
		return data.substring(0, visibleLength) + "****";
	}

}
