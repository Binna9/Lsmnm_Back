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

        // 모듈 경로 결정 - ServiceName 에 따라 자동 설정
        String module = "SCO"; // 기본값

        if (ServiceName != null && !ServiceName.isEmpty()) {
            if (ServiceName.contains("SMZ") || ServiceName.contains("smz")) {
                module = "SMZ";
            } else if (ServiceName.contains("SCO") || ServiceName.contains("sco")) {
                module = "SCO";
            } else if (ServiceName.contains("BDP") || ServiceName.contains("bdp")) {
                module = "BDP";
            }
        }

        String externalUrl = EXTERNAL_API_BASE + "/" + module + "/jqGridJSON.json?ServiceName=" + ServiceName;
        if (transitionName != null) {
            externalUrl += "&" + transitionName + "=1";
        }

        try {
            HttpHeaders headers = createHeaders(request, module);

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
            String responseBody = response.getBody();

            // 응답 본문이 null 이거나 비어있는 경우 처리
            if (responseBody == null || responseBody.trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("{\"is_success\": false, \"exception_message\": \"Empty response from server\"}");
            }

            // 응답이 HTML 인지 확인 (오류 페이지일 가능성)
            if (responseBody.trim().startsWith("<")) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("{\"is_success\": false, \"exception_message\": \"Server returned HTML instead of JSON\"}");
            }

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.APPLICATION_JSON);

            return ResponseEntity.status(response.getStatusCode())
                    .headers(responseHeaders)
                    .body(responseBody);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"is_success\": false, \"exception_message\": \"" + e.getMessage().replace("\"", "\\\"") + "\"}");
        }
    }

    /**
     * 공통 헤더 생성 - 원본 요청과 동일한 헤더 설정
     */
    private HttpHeaders createHeaders(HttpServletRequest request, String module) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Origin 헤더 - 외부 서버 도메인으로 설정
        headers.set("Origin", "https://mesdev.lsmnm.com");

        String refererHeader = request.getHeader("Referer");

        String refererUrl;

        if (refererHeader != null && !refererHeader.isEmpty()) {
            // 현재 요청의 페이지 번호 추출
            if (refererHeader.contains("/BDP7010")) {
                refererUrl = "https://mesdev.lsmnm.com/BDP/BDP7010.do";
            } else if (refererHeader.contains("/BDP7070")) {
                refererUrl = "https://mesdev.lsmnm.com/BDP/BDP7070.do";
            } else if (refererHeader.contains("/SMZ7010")) {
                refererUrl = "https://mesdev.lsmnm.com/SMZ/SMZ7010.do";
            } else if (refererHeader.contains("/SMZ7070")) {
                refererUrl = "https://mesdev.lsmnm.com/SMZ/SMZ7070.do";
            } else if (refererHeader.contains("/SCO7010")) {
                refererUrl = "https://mesdev.lsmnm.com/SCO/SCO7010.do";
            } else if (refererHeader.contains("/SCO7070")) {
                refererUrl = "https://mesdev.lsmnm.com/SCO/SCO7070.do";
            } else {
                // 기본값으로 모듈에 따른 7010 페이지 설정
                refererUrl = "https://mesdev.lsmnm.com/" + module + "/" + module + "7010.do";
            }
        } else {
            // 기본값으로 모듈에 따른 7010 페이지 설정
            refererUrl = "https://mesdev.lsmnm.com/" + module + "/" + module + "7010.do";
        }
        headers.set("Referer", refererUrl);

        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36");
        headers.set("Accept", "application/json, text/javascript, */*; q=0.01");
        headers.set("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7");

        // Accept-Encoding 을 명시적으로 설정하지 않음 (압축 문제 방지)
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

        return headers;
    }
}