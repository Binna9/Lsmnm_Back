package com.lsmnm.Tag.tagmaster.controller;

import com.lsmnm.Tag.tagmaster.dto.ComboServiceRequest;
import com.lsmnm.Tag.tagmaster.dto.InitServiceRequest;
import com.lsmnm.Tag.tagmaster.dto.SearchServiceRequest;
import com.lsmnm.Tag.tagmaster.service.TagMasterService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@Controller
@RequestMapping("/tag-master")
public class TagMasterController {

    private final TagMasterService tagMasterService;

    public TagMasterController(TagMasterService tagMasterService) {
        this.tagMasterService = tagMasterService;
    }

    /**
     * POST /tag-master/init
     * 클라이언트에서 전송한 form data를 받아서 init-service 호출
     */
    @PostMapping("/init")
    @ResponseBody
    public ResponseEntity<String> initJsonGrid(@ModelAttribute InitServiceRequest request) {
        String result = tagMasterService.callInitService(request);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(result);
    }

    /**
     * POST /tag-master/combo
     * 클라이언트에서 전송한 form data를 받아서 combo-service 호출
     */
    @PostMapping("/combo")
    @ResponseBody
    public ResponseEntity<String> comboJsonGrid(@ModelAttribute ComboServiceRequest request) {
        String result = tagMasterService.callComboService(request);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(result);
    }

    /**
     * POST /tag-master/search
     * 클라이언트에서 전송한 form data를 받아서 search-service 호출
     */
    @PostMapping("/search")
    @ResponseBody
    public ResponseEntity<String> searchJsonGrid(@ModelAttribute SearchServiceRequest request) {
        String result = tagMasterService.callSearchService(request);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        return ResponseEntity.ok()
                .headers(headers)
                .body(result);
    }
}
