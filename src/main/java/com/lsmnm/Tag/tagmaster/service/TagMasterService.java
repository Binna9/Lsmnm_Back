package com.lsmnm.Tag.tagmaster.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpSession;

@Service
public class TagMasterService {

    private final RestTemplate restTemplate;

    public TagMasterService(RestTemplate restTemplate)
    {this.restTemplate = restTemplate;}

    private final String scoUrl = "https://mesdev.lsmnm.com/SCO/jqGridJSON.json";
    private final String smzUrl = "https://mesdev.lsmnm.com/SMZ/jqGridJSON.json";

    private final String init = "ict.sys.init-service";
    private final String combo = "ict.sys.code.combo-service";

    /**
     * Spring Session 에서 데이터를 가져와서 init-service 호출
     */
    public String callInitService(String searchScreenAuthority, HttpSession session) {

        // Session Data
        String userId = (String) session.getAttribute("GW_USER_ID");
        String pgmId = (String) session.getAttribute("GW_PGM_ID");
        String langCd = (String) session.getAttribute("GW_LANG_CD");
        String lineCd = (String) session.getAttribute("GW_LINE_CD");
        String clientIp = (String) session.getAttribute("GW_CLIENT_IP");
        String plantCd = (String) session.getAttribute("GW_PLANT_CD");
        String mnuId = (String) session.getAttribute("MNU_ID");


        String url = scoUrl + "?ServiceName=" + init + "ScreenAuthority=" + (searchScreenAuthority != null ? searchScreenAuthority : "1");

        try {
            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.set("Origin", "https://mesdev.lsmnm.com");
            headers.set("Referer", "https://mesdev.lsmnm.com/SMZ/SMZ7010.do");

            // todo : 지금은 하드코딩 이지만 나중엔 클라이언트 단에서 받아야 함
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("USER_ID", userId);
            body.add("PGM_ID", pgmId);
            body.add("MNU_ID", mnuId);
            body.add("LANG_CD", langCd);
            body.add("LINE_CD", lineCd);
            body.add("gwLoginId", userId);
            body.add("gwServiceName", init);
            body.add("gwLanguageCd", langCd);
            body.add("gwClientIp", clientIp);
            body.add("gwPgmId", pgmId);
            body.add("gwPlantCd", plantCd);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            String responseBody = response.getBody();

            if (response.getHeaders().getContentType() != null) {
                response.getHeaders().getContentType();
            }

            return responseBody;

        } catch (Exception e) {
            return "{\"error\": \"" + e.getMessage() + "\"}";
        }
    }

    /**
     * Spring Session 에서 데이터를 가져와서 combo-service 호출
     */
    public String callComboService(String codeData, HttpSession session) {

        // Session Data
        String userId = (String) session.getAttribute("GW_USER_ID");
        String pgmId = (String) session.getAttribute("GW_PGM_ID");
        String langCd = (String) session.getAttribute("GW_LANG_CD");
        String clientIp = (String) session.getAttribute("GW_CLIENT_IP");
        String plantCd = (String) session.getAttribute("GW_PLANT_CD");

        String url = scoUrl + "?ServiceName=" + combo + "&find=1";

        try {
            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.set("Origin", "https://mesdev.lsmnm.com");
            headers.set("Referer", "https://mesdev.lsmnm.com/SMZ/SMZ7010.do");

            // todo : 지금은 하드코딩 이지만 나중엔 클라이언트 단에서 받아야 함
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("CODE", codeData);
            body.add("gwKeyList", "{\"gwKeyList\":[{\"key\":\"CODE\"}]}");
            body.add("gwLoginId", userId);
            body.add("gwServiceName", combo);
            body.add("gwLanguageCd", langCd);
            body.add("gwClientIp", clientIp);
            body.add("gwPgmId", pgmId);
            body.add("gwPlantCd", plantCd);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            String responseBody = response.getBody();

            if (response.getHeaders().getContentType() != null) {
                response.getHeaders().getContentType();
            }

            return responseBody;

        } catch (Exception e) {
            return "{\"error\": \"" + e.getMessage() + "\"}";
        }
    }

    public String callSearchService(HttpSession session){

        // Session Data
        String userId = (String) session.getAttribute("GW_USER_ID");
        String pgmId = (String) session.getAttribute("GW_PGM_ID");
        String langCd = (String) session.getAttribute("GW_LANG_CD");
        String clientIp = (String) session.getAttribute("GW_CLIENT_IP");
        String plantCd = (String) session.getAttribute("GW_PLANT_CD");

        String url = smzUrl + "?ServiceName=smz.tag.master-service&searchTagMst=1";

        try {
            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.set("Origin", "https://mesdev.lsmnm.com");
            headers.set("Referer", "https://mesdev.lsmnm.com/SMZ/SMZ7010.do");

            // todo : 지금은 하드코딩 이지만 나중엔 클라이언트 단에서 받아야 함
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
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
            body.add("gwServiceName", init);
            body.add("gwLanguageCd", langCd);
            body.add("gwClientIp", clientIp);
            body.add("gwPgmId", pgmId);
            body.add("gwPlantCd", plantCd);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            String responseBody = response.getBody();

            if (response.getHeaders().getContentType() != null) {
                response.getHeaders().getContentType();
            }

            return responseBody;

        } catch (Exception e) {
            return "{\"error\": \"" + e.getMessage() + "\"}";
        }
    }
}
