package com.lsmnm.Tag.proxy.Controller;

import com.lsmnm.Tag.proxy.Service.ProxyService;
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
    private final ProxyService proxyService;

    public ProxyController(RestTemplate restTemplate, ProxyService proxyService) {
        this.restTemplate = restTemplate;
        this.proxyService = proxyService;
    }

    private final String EXTERNAL_API_BASE = "https://mesdev.lsmnm.com";

    /**
     * 범용 jqGridJSON 프록시 - fc_submit 함수에서 호출하는 API 처리
     * POST /proxy/jqGridJSON.json
     */
    @PostMapping(value = "/jqGridJSON.json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> proxyJqGridJson(
            @RequestParam String ServiceName,
            @RequestParam(required = false) Map<String, String> allParams,
            HttpServletRequest request) {

        // URL 파라미터에서 ServiceName 과 Transition Name 추출 , allParams 는 Client 단에서 보내주는 파람
        String transitionName = null;
        for (Map.Entry<String, String> entry : allParams.entrySet()) {
            if (!entry.getKey().equals("ServiceName") && entry.getValue().equals("1")) {
                transitionName = entry.getKey();
                break;
            }
        }

        String module = "SCO"; // Default

        if (ServiceName != null && !ServiceName.isEmpty()) {
            if (ServiceName.contains("SMZ") || ServiceName.contains("smz")) {
                module = "SMZ";
            } else if (ServiceName.contains("SCO") || ServiceName.contains("sco")) {
                module = "SCO";
            }
        }

        String externalUrl = EXTERNAL_API_BASE + "/" + module + "/jqGridJSON.json?ServiceName=" + ServiceName;
        if (transitionName != null) {
            externalUrl += "&" + transitionName + "=1";
        }

        try {
            HttpHeaders headers = proxyService.createHeaders(request, module);

            // Referer 에서 PGM_ID 추출
            String pgmId = proxyService.extractPgmIdFromReferer(request.getHeader("Referer"));

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            Map<String, String[]> parameterMap = request.getParameterMap();

            for (Map.Entry<String, String[]> entry : parameterMap.entrySet()) {
                String key = entry.getKey();
                String[] values = entry.getValue();
                for (String value : values) {
                    body.add(key, value);
                }
            }

            // PGM_ID가 추출되었으면 기존 값을 덮어쓰기
            if (pgmId != null && !pgmId.isEmpty()) {
                body.set("PGM_ID", pgmId);
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
}