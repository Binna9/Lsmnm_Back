package com.lsmnm.Tag.proxy.Controller;

import com.lsmnm.Tag.proxy.Service.ProxyService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

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

    private final String EXTERNAL_API_BASE = "http://mesdev.lsmnm.com";

    /**
     * 범용 jqGridJSON 프록시 - fc_submit 함수에서 호출하는 API 처리
     * POST /proxy/jqGridJSON.json
     */
    @PostMapping(value = "/jqGridJSON.json")
    public ResponseEntity<?> proxyJqGridJson(
            @RequestParam String ServiceName,
            @RequestParam(required = false) Map<String, String> allParams,
            HttpServletRequest request) {

        // URL 파라미터에서 ServiceName 과 Transition Name 추출
        String transitionName = null;
        if (allParams != null) {
            for (Map.Entry<String, String> entry : allParams.entrySet()) {
                if (!entry.getKey().equals("ServiceName") && "1".equals(entry.getValue())) {
                    transitionName = entry.getKey();
                    break;
                }
            }
        }

        String module = "SCO";
        if (ServiceName != null && !ServiceName.isEmpty()) {
            if (ServiceName.toLowerCase().contains("smz")) {
                module = "SMZ";
            } else if (ServiceName.toLowerCase().contains("sco")) {
                module = "SCO";
            }
        }

        String externalUrl = EXTERNAL_API_BASE + "/" + module + "/jqGridJSON.json?ServiceName=" + ServiceName;
        if (transitionName != null) {
            externalUrl += "&" + transitionName + "=1";
        }

        try {
            HttpHeaders headers = proxyService.createHeaders(request, module);

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

            String responseBody = response.getBody();

            if (responseBody == null || responseBody.trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("{\"is_success\": false, \"exception_message\": \"Empty response from server\"}");
            }

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

    @GetMapping("/init")
    public ResponseEntity<?> processInitService() {

        String apiResponse = proxyService.callInitService();
        // TODO: JSON 파싱 후 비즈니스 로직 처리
        // ObjectMapper mapper = new ObjectMapper();
        // Map<String,Object> data = mapper.readValue(apiResponse, Map.class);

        return ResponseEntity.ok(apiResponse);
    }
}
