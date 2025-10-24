package com.lsmnm.Tag.proxy.Service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

@Service
public class ProxyService {

    /**
     * 공통 헤더 생성 - 원본 요청과 동일한 헤더 설정
     */
    public HttpHeaders createHeaders(HttpServletRequest request, String module) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Origin 헤더 - 외부 서버 도메인으로 설정
        headers.set("Origin", "https://mesdev.lsmnm.com");

        String contentType = request.getContentType();
        if (contentType == null || contentType.isEmpty()) {
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        }

        String refererUrl = "https://mesdev.lsmnm.com/" + module;

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

    /**
     * Referer URL 에서 PGM_ID 추출
     */
    public String extractPgmIdFromReferer(String refererHeader) {
        if (refererHeader == null || refererHeader.isEmpty()) {
            return null;
        }

        try {
            // URL 마지막 경로 세그먼트 추출
            String[] segments = refererHeader.split("/");
            if (segments.length > 0) {
                String lastSegment = segments[segments.length - 1];

                // 확장자 제거 (예: SMZ7030.do -> SMZ7030)
                if (lastSegment.contains(".")) {
                    lastSegment = lastSegment.substring(0, lastSegment.lastIndexOf("."));
                }

                // PGM_ID 패턴 확인 (예: SMZ7030, SCOA0040, BDP7010 등)
                if (lastSegment.matches("^[A-Z]{2,4}[0-9]{4}$")) {
                    return lastSegment;
                }
            }
        } catch (Exception e) {
            System.err.println("PGM_ID 추출 중 오류: " + e.getMessage());
        }

        return null;
    }
}
