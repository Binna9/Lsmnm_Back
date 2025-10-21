//package com.lsmnm.Tag.tagmaster.service;
//
//import com.lsmnm.Tag.tagmaster.dto.ComboServiceRequest;
//import com.lsmnm.Tag.tagmaster.dto.InitServiceRequest;
//import com.lsmnm.Tag.tagmaster.dto.SearchServiceRequest;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//
//@Service
//public class TagMasterService {
//
//    private final RestTemplate restTemplate;
//
//    public TagMasterService(RestTemplate restTemplate)
//    {this.restTemplate = restTemplate;}
//
//    private final String scoUrl = "https://mesdev.lsmnm.com/SCO/jqGridJSON.json";
//    private final String smzUrl = "https://mesdev.lsmnm.com/SMZ/jqGridJSON.json";
//
//    private final String init = "ict.sys.init-service";
//    private final String combo = "ict.sys.code.combo-service";
//
//    /**
//     * 클라이언트에서 전송한 form data를 받아서 init-service 호출
//     */
//    public String callInitService(InitServiceRequest request ) {
//
//        String url = scoUrl + "?ServiceName=" + init + "&ScreenAuthority=" +
//                    (request.getSearchScreenAuthority() != null ? request.getSearchScreenAuthority() : "1");
//
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//            headers.set("Origin", "https://mesdev.lsmnm.com");
//            headers.set("Referer", "https://mesdev.lsmnm.com/SMZ/SMZ7010.do");
//
//            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
//            body.add("USER_ID", request.getUserId());
//            body.add("PGM_ID", request.getPgmId());
//            body.add("MNU_ID", request.getMnuId());
//            body.add("LANG_CD", request.getLangCd());
//            body.add("LINE_CD", request.getLineCd());
//            body.add("gwLoginId", request.getUserId());
//            body.add("gwServiceName", init);
//            body.add("gwLanguageCd", request.getLangCd());
//            body.add("gwClientIp", request.getClientIp());
//            body.add("gwPgmId", request.getPgmId());
//            body.add("gwPlantCd", request.getPlantCd());
//
//            HttpEntity<MultiValueMap<String, String>> httpRequest = new HttpEntity<>(body, headers);
//            ResponseEntity<String> response = restTemplate.postForEntity(url, httpRequest, String.class);
//
//            return response.getBody();
//
//        } catch (Exception e) {
//            return "{\"error\": \"" + e.getMessage() + "\"}";
//        }
//    }
//
//    /**
//     * 클라이언트에서 전송한 form data를 받아서 combo-service 호출
//     */
//    public String callComboService(ComboServiceRequest request) {
//
//        String url = scoUrl + "?ServiceName=" + combo + "&find=1";
//
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//            headers.set("Origin", "https://mesdev.lsmnm.com");
//            headers.set("Referer", "https://mesdev.lsmnm.com/SMZ/SMZ7010.do");
//
//            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
//            body.add("CODE", request.getCode());
//            body.add("gwKeyList", "{\"gwKeyList\":[{\"key\":\"CODE\"}]}");
//            body.add("gwLoginId", request.getUserId());
//            body.add("gwServiceName", combo);
//            body.add("gwLanguageCd", request.getLangCd());
//            body.add("gwClientIp", request.getClientIp());
//            body.add("gwPgmId", request.getPgmId());
//            body.add("gwPlantCd", request.getPlantCd());
//
//            HttpEntity<MultiValueMap<String, String>> httpRequest = new HttpEntity<>(body, headers);
//            ResponseEntity<String> response = restTemplate.postForEntity(url, httpRequest, String.class);
//
//            return response.getBody();
//
//        } catch (Exception e) {
//            return "{\"error\": \"" + e.getMessage() + "\"}";
//        }
//    }
//
//    /**
//     * 클라이언트에서 전송한 form data를 받아서 search-service 호출
//     */
//    public String callSearchService(SearchServiceRequest request) {
//
//        String url = smzUrl + "?ServiceName=smz.tag.master-service&searchTagMst=1";
//
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//            headers.set("Origin", "https://mesdev.lsmnm.com");
//            headers.set("Referer", "https://mesdev.lsmnm.com/SMZ/SMZ7010.do");
//
//            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
//            body.add("SEARCH_TY", request.getSearchTy());
//            body.add("FAC_CD", request.getFacCd());
//            body.add("PROC_CD", request.getProcCd());
//            body.add("ASSET_CD", request.getAssetCd());
//            body.add("MON_TREE_CD", request.getMonTreeCd());
//            body.add("MON_SCR_CD", request.getMonScrCd());
//            body.add("TAG_ID", request.getTagId());
//            body.add("TAG_NM", request.getTagNm());
//            body.add("LINK_TAG_HIST", request.getLinkTagHist());
//            body.add("LINK_BIZ_SCR", request.getLinkBizScr());
//            body.add("LINK_BIZ_TAG", request.getLinkBizTag());
//            body.add("LINK_TAG_MACRO", request.getLinkTagMacro());
//            body.add("LINK_TAG_EVENT", request.getLinkTagEvent());
//            body.add("gwLoginId", request.getUserId());
//            body.add("gwServiceName", init);
//            body.add("gwLanguageCd", request.getLangCd());
//            body.add("gwClientIp", request.getClientIp());
//            body.add("gwPgmId", request.getPgmId());
//            body.add("gwPlantCd", request.getPlantCd());
//
//            HttpEntity<MultiValueMap<String, String>> httpRequest = new HttpEntity<>(body, headers);
//            ResponseEntity<String> response = restTemplate.postForEntity(url, httpRequest, String.class);
//
//            return response.getBody();
//
//        } catch (Exception e) {
//            return "{\"error\": \"" + e.getMessage() + "\"}";
//        }
//    }
//}
