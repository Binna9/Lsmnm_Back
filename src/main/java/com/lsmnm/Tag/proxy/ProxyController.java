package com.lsmnm.Tag.proxy;

import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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
//
//    /**
//     * Init Service 프록시
//     * POST /proxy/init
//     */
//    @PostMapping("/init")
//    public ResponseEntity<?> proxyInit(@RequestParam(defaultValue = "1") String searchSysEnv, HttpServletRequest request) {
//
//        String externalUrl = EXTERNAL_API_BASE + "/SCO/jqGridJSON.json?ServiceName=ict.sys.init-service&searchSysEnv=" + searchSysEnv;
//
//        HttpSession session = request.getSession();
//
//        try {
//            HttpHeaders headers = createHeaders();
//            MultiValueMap<String, String> body = createInitRequestBody(session);
//
//            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);
//
//            ResponseEntity<String> response = restTemplate.postForEntity(externalUrl, requestEntity, String.class);
//
//            HttpHeaders responseHeaders = new HttpHeaders();
//            responseHeaders.setContentType(MediaType.APPLICATION_JSON);
//
//            return ResponseEntity.status(response.getStatusCode())
//                    .headers(responseHeaders)
//                    .body(response.getBody());
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("{\"error\": \"" + e.getMessage() + "\"}");
//        }
//    }
//
//    /**
//     * Tag Master Service 프록시
//     * POST /proxy/tags
//     */
//    @PostMapping("/tags")
//    public ResponseEntity<?> proxyTags(
//            @RequestBody(required = false) Map<String, Object> requestBody,
//            HttpServletRequest request) {
//
//        String externalUrl = EXTERNAL_API_BASE + "/SMZ/jqGridJSON.json?ServiceName=smz.tag.master-service&searchTagMst=1";
//
//        HttpSession session = request.getSession();
//
//        try {
//            HttpHeaders headers = createHeaders();
//            MultiValueMap<String, String> body = createTagSearchRequestBody(session);
//
//            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);
//
//            ResponseEntity<String> response = restTemplate.postForEntity(externalUrl, requestEntity, String.class);
//
//            HttpHeaders responseHeaders = new HttpHeaders();
//            responseHeaders.setContentType(MediaType.APPLICATION_JSON);
//
//            return ResponseEntity.status(response.getStatusCode())
//                    .headers(responseHeaders)
//                    .body(response.getBody());
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("{\"error\": \"" + e.getMessage() + "\"}");
//        }
//    }
//
//    /**
//     * Combo Service 프록시
//     * POST /proxy/combo
//     */
//    @PostMapping("/combo")
//    public ResponseEntity<?> proxyCombo(
//            @RequestParam String code,
//            HttpServletRequest request) {
//
//        String externalUrl = EXTERNAL_API_BASE + "/SCO/jqGridJSON.json?ServiceName=ict.sys.code.combo-service&find=1";
//
//        HttpSession session = request.getSession();
//
//        try {
//            HttpHeaders headers = createHeaders();
//            MultiValueMap<String, String> body = createComboRequestBody(code, session);
//
//            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);
//
//            ResponseEntity<String> response = restTemplate.postForEntity(externalUrl, requestEntity, String.class);
//
//            HttpHeaders responseHeaders = new HttpHeaders();
//            responseHeaders.setContentType(MediaType.APPLICATION_JSON);
//
//            return ResponseEntity.status(response.getStatusCode())
//                    .headers(responseHeaders)
//                    .body(response.getBody());
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("{\"error\": \"" + e.getMessage() + "\"}");
//        }
//    }

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
        
        // 모듈 경로 결정 (기본값: SMZ)
        String module = "SMZ";
        if (allParams.containsKey("module")) {
            module = allParams.get("module");
        }
        
        String externalUrl = EXTERNAL_API_BASE + "/" + module + "/jqGridJSON.json?ServiceName=" + ServiceName;
        if (transitionName != null) {
            externalUrl += "&" + transitionName + "=1";
        }
        
        HttpSession session = request.getSession();
        
        try {
            HttpHeaders headers = createHeaders();
            MultiValueMap<String, String> body = createGenericRequestBodyFromRequest(ServiceName, transitionName, request, session);
            
            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);
            
            ResponseEntity<String> response = restTemplate.postForEntity(externalUrl, requestEntity, String.class);
            
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.APPLICATION_JSON);
            
            return ResponseEntity.status(response.getStatusCode())
                    .headers(responseHeaders)
                    .body(response.getBody());
                    
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    /**
     * 공통 헤더 생성
     */
    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Origin", "https://mesdev.lsmnm.com");
        headers.set("Referer", "https://mesdev.lsmnm.com/SMZ/SMZ7010.do");
        return headers;
    }

    /**
     * Request에서 직접 form 데이터를 추출하여 요청 바디 생성
     */
    private MultiValueMap<String, String> createGenericRequestBodyFromRequest(
            String serviceName, 
            String transitionName, 
            HttpServletRequest request,
            HttpSession session) {
        
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        
        // Session Data from SessionUtil
        String userId = (String) session.getAttribute("GW_USER_ID");
        String pgmId = (String) session.getAttribute("GW_PGM_ID");
        String langCd = (String) session.getAttribute("GW_LANG_CD");
        String clientIp = (String) session.getAttribute("GW_CLIENT_IP");
        String plantCd = (String) session.getAttribute("GW_PLANT_CD");
        String lineCd = (String) session.getAttribute("GW_LINE_CD");
        String empNo = (String) session.getAttribute("GW_EMP_NO");
        String deptCd = (String) session.getAttribute("GW_DEPT_CD");
        String roleCd = (String) session.getAttribute("GW_ROLE_CD");

        // 기본값 설정 (SessionUtil의 Mock 데이터와 일치)
        if (userId == null) userId = "99991201";
        if (pgmId == null) pgmId = "SI0003";
        if (langCd == null) langCd = "KO";
        if (clientIp == null) clientIp = "10.2.110.216";
        if (plantCd == null) plantCd = "1000";
        if (lineCd == null) lineCd = "";
        if (empNo == null) empNo = "99991201";
        if (deptCd == null) deptCd = "";
        if (roleCd == null) roleCd = "MES_INQ_ROLE,MB_TEMP,ITSM";

        // 기본 GW 파라미터 추가 (SessionUtil 데이터 사용)
        body.add("USER_ID", userId);
        body.add("PGM_ID", pgmId);
        body.add("LANG_CD", langCd);
        body.add("LINE_CD", lineCd);
        body.add("EMP_NO", empNo);
        body.add("DEPT_CD", deptCd);
        body.add("ROLE_CD", roleCd);
        body.add("PLANT_CD", plantCd);
        body.add("CLIENT_IP", clientIp);
        
        // GW 파라미터 추가
        body.add("gwLoginId", userId);
        body.add("gwServiceName", serviceName);
        body.add("gwLanguageCd", langCd);
        body.add("gwClientIp", clientIp);
        body.add("gwPgmId", pgmId);
        body.add("gwPlantCd", plantCd);

        // Request 에서 모든 파라미터 추출
        Map<String, String[]> parameterMap = request.getParameterMap();
        for (Map.Entry<String, String[]> entry : parameterMap.entrySet()) {
            String key = entry.getKey();
            String[] values = entry.getValue();
            
            if (!key.equals("ServiceName") && !key.equals(transitionName)) {
                for (String value : values) {
                    body.add(key, value);
                }
            }
        }

        if (transitionName != null && !transitionName.isEmpty()) {
            body.add(transitionName, "1");
        }

        return body;
    }
}
