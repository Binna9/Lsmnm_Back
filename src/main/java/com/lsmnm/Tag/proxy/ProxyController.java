package com.lsmnm.Tag.proxy;

import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/proxy")
public class ProxyController {

    private final RestTemplate restTemplate;
    private final String EXTERNAL_API_BASE = "https://mesdev.lsmnm.com";

    public ProxyController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/image")
    public ResponseEntity<byte[]> proxyImage(@RequestParam String path) {
        String externalUrl = EXTERNAL_API_BASE + path;
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Referer", "https://mesdev.lsmnm.com/SMZ/SMZ7010.do");

            HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
            ResponseEntity<byte[]> response = restTemplate.exchange(
                    externalUrl,
                    HttpMethod.GET,
                    requestEntity,
                    byte[].class
            );

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(response.getHeaders().getContentType());
            return new ResponseEntity<>(response.getBody(), responseHeaders, response.getStatusCode());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    /**
     * 범용 jqGridJSON 프록시 - fc_submit 함수에서 호출하는 API 처리
     * POST /proxy/jqGridJSON.json
     */
    @PostMapping(value = "/jqGridJSON.json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> proxyJqGridJson(
            @RequestParam String ServiceName,
            @RequestParam(required = false) Map<String, String> allParams,
            HttpServletRequest request) {
        
        // URL 파라미터에서 ServiceName 과 Transition Name 추출
        String transitionName = null;
        for (Map.Entry<String, String> entry : allParams.entrySet()) {
            if (!entry.getKey().equals("ServiceName") && entry.getValue().equals("1")) {
                transitionName = entry.getKey();
                break;
            }
        }
        
        // 모듈 경로 결정 - ServiceName에 따라 자동 설정
        String module = "SCO"; // 기본값
        if (ServiceName != null && !ServiceName.isEmpty()) {
            if (ServiceName.contains("SMZ")) {
                module = "SMZ";
            } else if (ServiceName.contains("SCO")) {
                module = "SCO";
            } else if (ServiceName.contains("BDP")) {
                module = "BDP";
            }
        }
        
        String externalUrl = EXTERNAL_API_BASE + "/" + module + "/jqGridJSON.json?ServiceName=" + ServiceName;
        if (transitionName != null) {
            externalUrl += "&" + transitionName + "=1";
        }
        
        try {
            HttpHeaders headers = createHeaders(request);
            
            // 클라이언트에서 보낸 모든 파라미터를 그대로 전달
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            Map<String, String[]> parameterMap = request.getParameterMap();
            for (Map.Entry<String, String[]> entry : parameterMap.entrySet()) {
                String key = entry.getKey();
                String[] values = entry.getValue();
                for (String value : values) {
                    body.add(key, value);
                }
            }
            
            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);
            
            ResponseEntity<String> response = restTemplate.postForEntity(externalUrl, requestEntity, String.class);
            
            // 응답 내용 로깅 (디버깅용)
            System.out.println("Response Status: " + response.getStatusCode());
            System.out.println("Response Headers: " + response.getHeaders());
            System.out.println("Response Body Length: " + (response.getBody() != null ? response.getBody().length() : "null"));
            
            // 응답 본문이 null이거나 비어있는 경우 처리
            String responseBody = response.getBody();
            if (responseBody == null || responseBody.trim().isEmpty()) {
                System.err.println("Empty response body received");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("{\"is_success\": false, \"exception_message\": \"Empty response from server\"}");
            }
            
            // 응답이 HTML인지 확인 (오류 페이지일 가능성)
            if (responseBody.trim().startsWith("<")) {
                System.err.println("HTML response received instead of JSON: " + responseBody.substring(0, Math.min(200, responseBody.length())));
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("{\"is_success\": false, \"exception_message\": \"Server returned HTML instead of JSON\"}");
            }
            
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.APPLICATION_JSON);
            
            return ResponseEntity.status(response.getStatusCode())
                    .headers(responseHeaders)
                    .body(responseBody);
                    
        } catch (Exception e) {
            // 오류 로깅
            System.err.println("Proxy Error: " + e.getMessage());
            e.printStackTrace();
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"is_success\": false, \"exception_message\": \"" + e.getMessage().replace("\"", "\\\"") + "\"}");
        }
    }

    /**
     * 공통 헤더 생성 - 원본 요청과 동일한 헤더 설정
     */
    private HttpHeaders createHeaders(HttpServletRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        
        // 원본 요청과 동일한 헤더 설정
        headers.set("Origin", "https://mesdev.lsmnm.com");
        
        // Referer 헤더 동적 설정 - ServiceName에 따라 올바른 경로 설정
        String refererUrl = "https://mesdev.lsmnm.com/SCO/SCO7070.do";
        String serviceName = request.getParameter("ServiceName");
        if (serviceName != null && !serviceName.isEmpty()) {
            if (serviceName.contains("SMZ")) {
                refererUrl = "https://mesdev.lsmnm.com/SMZ/SMZ7070.do";
            } else if (serviceName.contains("SCO")) {
                refererUrl = "https://mesdev.lsmnm.com/SCO/SCO7070.do";
            } else if (serviceName.contains("BDP")) {
                refererUrl = "https://mesdev.lsmnm.com/BDP/BDP7070.do";
            }
        }
        headers.set("Referer", refererUrl);
        
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36");
        headers.set("Accept", "application/json, text/javascript, */*; q=0.01");
        headers.set("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7");
        // Accept-Encoding을 명시적으로 설정하지 않음 (압축 문제 방지)
        headers.set("Cache-Control", "no-cache");
        headers.set("Pragma", "no-cache");
        headers.set("X-Requested-With", "XMLHttpRequest");
        
        // sec-ch-ua 헤더들 (Chrome 보안 헤더)
        headers.set("sec-ch-ua", "\"Google Chrome\";v=\"141\", \"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"141\"");
        headers.set("sec-ch-ua-mobile", "?0");
        headers.set("sec-ch-ua-platform", "\"Windows\"");
        headers.set("sec-fetch-dest", "empty");
        headers.set("sec-fetch-mode", "cors");
        headers.set("sec-fetch-site", "same-origin");
        
        // 쿠키 헤더 설정 - 클라이언트 쿠키가 있으면 사용, 없으면 기본값
        String cookieHeader = request.getHeader("Cookie");
        if (cookieHeader == null || cookieHeader.isEmpty()) {
            cookieHeader = "JSESSIONID=B7Tj96XAD_3u45F8qUvRADP7l0gmoVzDTR53BG4Q.SCO_01; USERID=; LANG_CD=; LOGIN_CERT_TYPE=";
        }
        headers.set("Cookie", cookieHeader);
        
        return headers;
    }
}
