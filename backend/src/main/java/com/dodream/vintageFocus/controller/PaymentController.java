package com.dodream.vintageFocus.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;
import java.util.HashMap;


@RestController
@RequestMapping("/api/payment")
public class PaymentController {

  @Value("${PORTONE_API_KEY}")
  private String apiKey;

  @Value("${PORTONE_API_SECRET}")
  private String apiSecret;

  // ✅ PortOne(아임포트) 결제 검증 API
  @PostMapping("/verify")
  public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> request) {
    String impUid = request.get("imp_uid");
    String merchantUid = request.get("merchant_uid");
    int amount = Integer.parseInt(request.get("amount"));

    try {
      // ✅ PortOne 서버에서 결제 정보 조회
      RestTemplate restTemplate = new RestTemplate();
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);

      // ✅ PortOne 인증 토큰 발급
      String token = getPortOneToken();
      headers.set("Authorization", token);

      HttpEntity<String> entity = new HttpEntity<>(headers);
      String url = "https://api.iamport.kr/payments/" + impUid;
      ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

      // ✅ 결제 금액 검증
      Map<String, Object> responseData = response.getBody();
      if (responseData != null && (int) responseData.get("amount") == amount) {
        return ResponseEntity.ok(Map.of("success", true, "message", "결제 검증 성공"));
      } else {
        return ResponseEntity.status(400).body(Map.of("success", false, "message", "결제 검증 실패"));
      }
    } catch (Exception e) {
      return ResponseEntity.status(500).body(Map.of("success", false, "message", "서버 오류 발생"));
    }
  }

  // PortOne 인증 토큰 발급 메서드
  private String getPortOneToken() {
    RestTemplate restTemplate = new RestTemplate();
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    Map<String, String> requestBody = new HashMap<>();
    requestBody.put("imp_key", apiKey);
    requestBody.put("imp_secret", apiSecret);

    HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
    ResponseEntity<Map> response = restTemplate.exchange("https://api.iamport.kr/users/getToken", HttpMethod.POST, entity, Map.class);

    Map<String, Object> responseData = response.getBody();
    return responseData != null ? (String) ((Map) responseData.get("response")).get("access_token") : null;
  }
}
