package com.lsmnm.Tag.tagmaster.controller;

import com.lsmnm.Tag.tagmaster.service.TagMasterService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/tag-master")
public class TagMasterController {

    private final TagMasterService tagMasterService;

    public TagMasterController(TagMasterService tagMasterService) {
        this.tagMasterService = tagMasterService;
    }

    /**
     * POST /api/init
     */
    @PostMapping("/init")
    public ResponseEntity<String> initJsonGrid(
            @RequestParam(defaultValue = "1") String searchScreenAuthority,
            HttpServletRequest request) {
        
        HttpSession session = request.getSession();
        String result = tagMasterService.callInitService(searchScreenAuthority, session);

        // 응답 헤더에 UTF-8 charset 명시
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(result);
    }

    /**
     * POST /api/combo
     */
    @PostMapping("/combo")
    public ResponseEntity<String> comboJsonGrid(
            @RequestParam String code,
            HttpServletRequest request) {
        
        HttpSession session = request.getSession();
        String result = tagMasterService.callComboService(code, session);

        // 응답 헤더에 UTF-8 charset 명시
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(result);
    }

    /**
     * POST /api/search
     */
    @PostMapping("/search")
    public ResponseEntity<String> searchJsonGrid(HttpServletRequest request) {

        HttpSession session = request.getSession();
        String result = tagMasterService.callSearchService(session);

        // 응답 헤더에 UTF-8 charset 명시
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        return ResponseEntity.ok()
                .headers(headers)
                .body(result);
    }
}
