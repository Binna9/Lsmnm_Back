package com.lsmnm.Tag.util;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Enumeration;

@RestController
@RequestMapping("/session")
public class SessionUtil {

    @GetMapping("")
    public ResponseEntity<String> getSessionData(HttpServletRequest request) {
        HttpSession session = request.getSession();

        try {
            StringBuilder sessionData = new StringBuilder();
            sessionData.append("{");
            sessionData.append("\"success\": true,");
            sessionData.append("\"sessionId\": \"").append(session.getId()).append("\",");
            sessionData.append("\"creationTime\": \"").append(new java.util.Date(session.getCreationTime())).append("\",");
            sessionData.append("\"lastAccessedTime\": \"").append(new java.util.Date(session.getLastAccessedTime())).append("\",");
            sessionData.append("\"maxInactiveInterval\": ").append(session.getMaxInactiveInterval()).append(",");
            sessionData.append("\"attributes\": {");

            // 세션 속성들을 JSON 형태로 변환
            Enumeration<String> attributeNames = session.getAttributeNames();
            boolean first = true;
            while (attributeNames.hasMoreElements()) {
                String attributeName = attributeNames.nextElement();
                Object attributeValue = session.getAttribute(attributeName);

                if (!first) {
                    sessionData.append(",");
                }
                first = false;

                sessionData.append("\"").append(attributeName).append("\": ");

                if (attributeValue == null) {
                    sessionData.append("null");
                } else if (attributeValue instanceof String) {
                    sessionData.append("\"").append(attributeValue.toString().replace("\"", "\\\"")).append("\"");
                } else if (attributeValue instanceof Number || attributeValue instanceof Boolean) {
                    sessionData.append(attributeValue.toString());
                } else {
                    // 복잡한 객체는 문자열로 변환
                    sessionData.append("\"").append(attributeValue.toString().replace("\"", "\\\"")).append("\"");
                }
            }

            sessionData.append("}");
            sessionData.append("}");

            return ResponseEntity.ok()
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(sessionData.toString());

        } catch (Exception e) {
            String errorResponse = "{\"success\": false, \"message\": \"" + e.getMessage() + "\"}";
            return ResponseEntity.status(500)
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(errorResponse);
        }
    }

    /**
     * Mock 데이터를 Spring Session 에 저장
     * POST /api/save-session
     */
//    @PostMapping("")
//    public ResponseEntity<String> saveSessionData(HttpServletRequest request) {
//        HttpSession session = request.getSession();
//
//        String result = saveMockDataToSession(session);
//
//        // JSON 응답 파싱하여 적절한 HTTP 상태 코드 반환
//        if (result.contains("\"success\": true")) {
//            return ResponseEntity.ok(result);
//        } else {
//            return ResponseEntity.badRequest().body(result);
//        }
//    }


    /**
     * Mock 데이터를 Spring Session 에 저장
     */
//    private String saveMockDataToSession(HttpSession session) {
//        try {
//
//            session.setAttribute("GW_CLIENT_IP", "10.2.110.216");
//            session.setAttribute("GW_DEPT_CD", "");
//            session.setAttribute("GW_DEPT_NM", "");
//            session.setAttribute("GW_EMP_NO", "99991201");
//            session.setAttribute("GW_LANG_CD", "KO");
//            session.setAttribute("GW_LINE_CD", "");
//            session.setAttribute("GW_OPER_DT", "jsonData:\"1899-11-29T15:32:08.000Z\"");
//            session.setAttribute("GW_OUTSIDE_ACCESS_YN", "N");
//            session.setAttribute("GW_PASSWD_EXPIRE_DT", "20251215");
//            session.setAttribute("GW_PGM_ID", "SI0003");
//            session.setAttribute("GW_PLANT_CD", "1000");
//            session.setAttribute("GW_ROLE_CD", "MES_INQ_ROLE,MB_TEMP,ITSM");
//            session.setAttribute("GW_SERVER_INFO", "개발");
//            session.setAttribute("GW_SSO_YN", "N");
//            session.setAttribute("GW_SYSTEM_ENV", "jsonData:{\"themes\":\"ui-redmond\",\"user\":{\"id\":\"99991201\",\"name\":\"김성준\",\"deptCd\":\"UNKNOWN\",\"clientIp\":\"10.2.110.216\",\"pgmTitle\":\"Tag Master\",\"pgmTy\":\"S\",\"comCd\":\"LSNC\",\"comNm\":\"ODS MES\",\"plantCd\":\"1000\",\"lineCd\":\"\"},\"grid\":{\"addFlag\":\"I\",\"delFlag\":\"D\",\"updateFlag\":\"U\",\"isPage\":false,\"isFilter\":false,\"isAutoSave\":false},\"completeMsg\":{\"isSearch\":false,\"isSave\":true,\"isDelete\":true,\"isConfirm\":true,\"isSend\":true,\"isFilesave\":true},\"mainmenu\":{\"isMenuAutoHide\":true,\"isSideMenu\":false,\"isOpenByClick\":true,\"isExpand\":false,\"isPgmId\":true},\"screen\":{\"showTabList\":true,\"tabCaptionLth\":25,\"logLevel\":\"1\",\"isDefMessageArea\":false,\"reportMainPgmId\":\"SRTC000\",\"reportDefaultURL\":\"/SRT/pages/\",\"paddingSize\":5,\"maxinteger\":\"50\",\"listboxval\":\"20\",\"listboxmaxlen\":\"500\"},\"format\":{\"delim\":{\"source\":{\"date\":\"\",\"time\":\"\",\"datetime\":\"\"},\"target\":{\"date\":\"-\",\"time\":\":\",\"datetime\":\" \"}},\"date\":{\"source\":\"YMD\",\"target\":\"YMD\",\"date\":{\"picker\":\"yyyy-MM-dd\",\"year\":0,\"month\":1,\"day\":2},\"yearmonth\":{\"picker\":\"yyyy-MM\"},\"monthday\":{\"picker\":\"MM-dd\"}},\"time\":{\"source\":\"HMS\",\"target\":\"HMS\",\"time\":{\"picker\":\"HH:mm:ss\"},\"hour\":{\"picker\":\"HH\"},\"hourmin\":{\"picker\":\"HH:mm\"},\"minsec\":{\"picker\":\"mm:ss\"}},\"slab\":{\"thk\":0,\"wth\":-1,\"lth\":-1,\"wgt\":2},\"plate\":{\"thk\":0,\"wth\":-1,\"lth\":-1,\"wgt\":2},\"coil\":{\"thk\":0,\"wth\":-1,\"lth\":-1,\"wgt\":2},\"bloom\":{\"thk\":0,\"wth\":-1,\"lth\":-1,\"wgt\":2},\"billet\":{\"thk\":0,\"wth\":-1,\"lth\":-1,\"wgt\":2},\"separate\":{\"source\":{\"thousand\":\"\",\"deciaml\":\".\",\"decimal\":\".\"},\"target\":{\"thousand\":\",\",\"deciaml\":\".\",\"decimal\":\".\"}}},\"lang\":{\"cd\":\"KO\",\"datepicker\":\"ko\",\"grid\":\"ko\",\"isMultiLanguage\":true,\"isUseDefLabel\":false,\"prefix\":\"@_\",\"isUseSession\":true,\"isMultiLanguageSys\":\"SCO\"},\"item\":{\"itemcd\":\"item_cd\",\"itemvalue\":\"item_value\",\"datatype\":\"datatype\",\"category\":\"category\"},\"operInfo\":{\"date\":\"\",\"shift\":\"\",\"dateTime\":\"\"},\"shift\":{\"A\":\"08\",\"B\":\"20\",\"C\":\"20\",\"D\":\"\",\"E\":\"\",\"CNT\":2},\"btnSize\":{\"search\":70,\"save\":70,\"del\":70,\"conf\":70,\"print\":70,\"close\":70,\"cust1\":85,\"cust2\":85,\"cust3\":85,\"cust4\":85,\"cust5\":85}}");
//            session.setAttribute("GW_TITLE", "");
//            session.setAttribute("GW_USER_ID", "99991201");
//            session.setAttribute("GW_USER_NM", "김성준");
//            session.setAttribute("GW_WELCOME_PGM_ID", "SI0003");
//            session.setAttribute("SYSTEM_LINK_KEYS", "");
//            session.setAttribute("SYSTEM_LINK_PAGE", "");
//            session.setAttribute("SYSTEM_LINK_VALUES", "");
//
//            return "{\"success\": true, \"message\": \"Mock data saved to Spring Session successfully\", \"sessionData\": {\"GW_USER_ID\":\"99991201\",\"GW_PGM_ID\":\"SI0003\",\"GW_LANG_CD\":\"KO\",\"GW_LINE_CD\":\"\",\"GW_PLANT_CD\":\"1000\",\"GW_CLIENT_IP\":\"10.2.110.216\",\"GW_EMP_NO\":\"99991201\",\"GW_DEPT_CD\":\"\",\"GW_ROLE_CD\":\"MES_INQ_ROLE,MB_TEMP,ITSM\"}}";
//
//        } catch (Exception e) {
//            return "{\"success\": false, \"message\": \"" + e.getMessage() + "\"}";
//        }
//    }
}
