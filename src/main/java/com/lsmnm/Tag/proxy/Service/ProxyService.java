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

        String refererHeader = request.getHeader("Referer");

        String refererUrl;

        if (refererHeader != null && !refererHeader.isEmpty()) {
            // 현재 요청의 페이지 번호 추출
            if (refererHeader.contains("/BDP7010")) {
                refererUrl = "https://mesdev.lsmnm.com/SMZ/SMZ7010.do";
            } else if (refererHeader.contains("/BDP7070")) {
                refererUrl = "https://mesdev.lsmnm.com/SMZ/SMZ7070.do";
            } else if (refererHeader.contains("/BDP6012")) {
                refererUrl = "https://mesdev.lsmnm.com/SMZ/SMZ6012.do";
            } else if (refererHeader.contains("/BDP6212")) {
                refererUrl = "https://mesdev.lsmnm.com/SMZ/SMZ6212.do";
            } else if (refererHeader.contains("/BDP6215")) {
                refererUrl = "https://mesdev.lsmnm.com/SMZ/SMZ6215.do";
            } else if (refererHeader.contains("/BDP6213")) {
                refererUrl = "https://mesdev.lsmnm.com/SMZ/SMZ6213.do";
            } else if (refererHeader.contains("/BDP6214")) {
                refererUrl = "https://mesdev.lsmnm.com/SMZ/SMZ6214.do";
            } else if (refererHeader.contains("/BDP0040")) {
                refererUrl = "https://mesdev.lsmnm.com/SCO/SCOA0040.do";
            } else if (refererHeader.contains("/BDP0050")) {
                refererUrl = "https://mesdev.lsmnm.com/SCO/SCOA0050.do";
            } else if (refererHeader.contains("/BDP0060")) {
                refererUrl = "https://mesdev.lsmnm.com/SCO/SCOA0060.do";
            } else {
                // 기본값으로 모듈에 따른 7010 페이지 설정
                refererUrl = "https://mesdev.lsmnm.com/" + module;
            }
        } else {
            // 기본값으로 모듈에 따른 7010 페이지 설정
            refererUrl = "https://mesdev.lsmnm.com/" + module;
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

    /**
     * Referer URL 에서 PGM_ID 추출
     */
    public String extractPgmIdFromReferer(String refererHeader) {
        if (refererHeader == null || refererHeader.isEmpty()) {
            return null;
        }

        try {
            // URL에서 마지막 경로 세그먼트 추출
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
            // 로깅은 하되 예외는 무시하고 null 반환
            System.err.println("PGM_ID 추출 중 오류: " + e.getMessage());
        }

        return null;
    }
}
