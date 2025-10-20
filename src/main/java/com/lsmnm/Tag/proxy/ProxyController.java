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

    /**
     * Init Service 프록시
     * POST /proxy/init
     */
    @PostMapping("/init")
    public ResponseEntity<?> proxyInit(@RequestParam(defaultValue = "1") String searchSysEnv, HttpServletRequest request) {
        
        String externalUrl = EXTERNAL_API_BASE + "/SCO/jqGridJSON.json?ServiceName=ict.sys.init-service&searchSysEnv=" + searchSysEnv;
        
        HttpSession session = request.getSession();
        
        try {
            HttpHeaders headers = createHeaders();
            MultiValueMap<String, String> body = createInitRequestBody(session);

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
     * Tag Master Service 프록시
     * POST /proxy/tags
     */
    @PostMapping("/tags")
    public ResponseEntity<?> proxyTags(
            @RequestBody(required = false) Map<String, Object> requestBody,
            HttpServletRequest request) {
        
        String externalUrl = EXTERNAL_API_BASE + "/SMZ/jqGridJSON.json?ServiceName=smz.tag.master-service&searchTagMst=1";
        
        HttpSession session = request.getSession();
        
        try {
            HttpHeaders headers = createHeaders();
            MultiValueMap<String, String> body = createTagSearchRequestBody(session);
            
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
     * Combo Service 프록시
     * POST /proxy/combo
     */
    @PostMapping("/combo")
    public ResponseEntity<?> proxyCombo(
            @RequestParam String code,
            HttpServletRequest request) {
        
        String externalUrl = EXTERNAL_API_BASE + "/SCO/jqGridJSON.json?ServiceName=ict.sys.code.combo-service&find=1";
        
        HttpSession session = request.getSession();
        
        try {
            HttpHeaders headers = createHeaders();
            MultiValueMap<String, String> body = createComboRequestBody(code, session);
            
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
     * Init Service 요청 바디 생성
     */
    private MultiValueMap<String, String> createInitRequestBody(HttpSession session) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        
        // Session Data
        String userId = (String) session.getAttribute("GW_USER_ID");
        String pgmId = (String) session.getAttribute("GW_PGM_ID");
        String langCd = (String) session.getAttribute("GW_LANG_CD");
        String lineCd = (String) session.getAttribute("GW_LINE_CD");
        String clientIp = (String) session.getAttribute("GW_CLIENT_IP");
        String plantCd = (String) session.getAttribute("GW_PLANT_CD");
        String mnuId = (String) session.getAttribute("MNU_ID");

        // 기본값 설정
        if (userId == null) userId = "99991201";
        if (pgmId == null) pgmId = "SMZ7010";
        if (langCd == null) langCd = "ko";
        if (lineCd == null) lineCd = "";
        if (clientIp == null) clientIp = "127.0.0.1";
        if (plantCd == null) plantCd = "1000";
        if (mnuId == null) mnuId = "M000001460";

        body.add("USER_ID", userId);
        body.add("PGM_ID", pgmId);
        body.add("MNU_ID", mnuId);
        body.add("LANG_CD", langCd);
        body.add("LINE_CD", lineCd);
        body.add("gwLoginId", userId);
        body.add("gwServiceName", "ict.sys.init-service");
        body.add("gwLanguageCd", langCd);
        body.add("gwClientIp", clientIp);
        body.add("gwPgmId", pgmId);
        body.add("gwPlantCd", plantCd);

        return body;
    }

    /**
     * Tag Search Service 요청 바디 생성
     */
    private MultiValueMap<String, String> createTagSearchRequestBody(HttpSession session) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        
        // Session Data
        String userId = (String) session.getAttribute("GW_USER_ID");
        String pgmId = (String) session.getAttribute("GW_PGM_ID");
        String langCd = (String) session.getAttribute("GW_LANG_CD");
        String clientIp = (String) session.getAttribute("GW_CLIENT_IP");
        String plantCd = (String) session.getAttribute("GW_PLANT_CD");

        // 기본값 설정
        if (userId == null) userId = "99991201";
        if (pgmId == null) pgmId = "SMZ7010";
        if (langCd == null) langCd = "ko";
        if (clientIp == null) clientIp = "127.0.0.1";
        if (plantCd == null) plantCd = "1000";

        body.add("SEARCH_TY", "SCR");
        body.add("FAC_CD", "A10");
        body.add("PROC_CD", "");
        body.add("ASSET_CD", "");
        body.add("MON_TREE_CD", "1760");
        body.add("MON_SCR_CD", "1803");
        body.add("TAG_ID", "");
        body.add("TAG_NM", "");
        body.add("LINK_TAG_HIST", "변경이력");
        body.add("LINK_BIZ_SCR", "화면별관리");
        body.add("LINK_BIZ_TAG", "업무별관리");
        body.add("LINK_TAG_MACRO", "집계관리");
        body.add("LINK_TAG_EVENT", "이벤트/알람관리");
        body.add("gwLoginId", userId);
        body.add("gwServiceName", "ict.sys.init-service");
        body.add("gwLanguageCd", langCd);
        body.add("gwClientIp", clientIp);
        body.add("gwPgmId", pgmId);
        body.add("gwPlantCd", plantCd);

        return body;
    }

    /**
     * Combo Service 요청 바디 생성
     */
    private MultiValueMap<String, String> createComboRequestBody(String code, HttpSession session) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        
        // Session Data
        String userId = (String) session.getAttribute("GW_USER_ID");
        String pgmId = (String) session.getAttribute("GW_PGM_ID");
        String langCd = (String) session.getAttribute("GW_LANG_CD");
        String clientIp = (String) session.getAttribute("GW_CLIENT_IP");
        String plantCd = (String) session.getAttribute("GW_PLANT_CD");

        // 기본값 설정
        if (userId == null) userId = "99991201";
        if (pgmId == null) pgmId = "SMZ7010";
        if (langCd == null) langCd = "ko";
        if (clientIp == null) clientIp = "127.0.0.1";
        if (plantCd == null) plantCd = "1000";

        body.add("CODE", code);
        body.add("gwKeyList", "{\"gwKeyList\":[{\"key\":\"CODE\"}]}");
        body.add("gwLoginId", userId);
        body.add("gwServiceName", "ict.sys.code.combo-service");
        body.add("gwLanguageCd", langCd);
        body.add("gwClientIp", clientIp);
        body.add("gwPgmId", pgmId);
        body.add("gwPlantCd", plantCd);

        return body;
    }
}
