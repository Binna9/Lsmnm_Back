package com.lsmnm.Tag.proxy.Service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class ProxyService {

    private final RestTemplate restTemplate;

    public HttpHeaders createHeaders(HttpServletRequest request, String module) {
        HttpHeaders headers = new HttpHeaders();

        // Content-Type 유지
        String contentType = request.getContentType();
        if (contentType != null) {
            headers.set(HttpHeaders.CONTENT_TYPE, contentType);
        } else {
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        }

        // 메인 서버 도메인으로 위장
        headers.set("Origin", "http://mesdev.lsmnm.com");
        headers.set("Referer", "http://mesdev.lsmnm.com/" + module);

        // 원본 요청에서 필요한 헤더 복사
        copyHeaderIfPresent(request, headers, "User-Agent");
        copyHeaderIfPresent(request, headers, "Accept");
        copyHeaderIfPresent(request, headers, "Accept-Language");
        copyHeaderIfPresent(request, headers, "X-Requested-With");

        // sec-fetch-* 헤더는 브라우저 원본 그대로 전달
        copyHeaderIfPresent(request, headers, "sec-fetch-dest");
        copyHeaderIfPresent(request, headers, "sec-fetch-mode");
        copyHeaderIfPresent(request, headers, "sec-fetch-site");

        return headers;
    }

    // init api 호출
    public String callInitService() {
        // 1. Body(form-data) 구성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("ServiceName", "ict.sys.init-service");
        body.add("searchScreenAuthority", "1");

        // 2. Header 구성
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Accept", "application/json, text/javascript, */*; q=0.01");
        headers.set("Accept-Language", "ko,en;q=0.9,en-US;q=0.8");
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                + "AppleWebKit/537.36 (KHTML, like Gecko) "
                + "Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0");
        headers.set("X-Requested-With", "XMLHttpRequest");
        headers.set("Origin", "http://mesdev.lsmnm.com");
        headers.set("Referer", "http://mesdev.lsmnm.com/SCO/SCOA0040.do");

        headers.set("Cookie", "X77Jac7C6k_cfUbuJ5DuXZBEEZzt1_vXXYYrfN8P.SCO_01; USERID=; LANG_CD=; LOGIN_CERT_TYPE=");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

        // 3. 외부 API 호출
        String url = "http://mesdev.lsmnm.com/SCO/jqGridJSON.json";
        ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);

        // 4. 응답 처리
        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody(); // JSON 문자열
        } else {
            throw new RuntimeException("API 호출 실패: " + response.getStatusCode());
        }
    }

    private void copyHeaderIfPresent(HttpServletRequest request, HttpHeaders headers, String name) {
        String value = request.getHeader(name);
        if (value != null) {
            headers.set(name, value);
        }
    }
}
