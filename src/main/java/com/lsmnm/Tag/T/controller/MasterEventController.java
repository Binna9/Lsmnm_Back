package com.lsmnm.Tag.T.controller;

import com.lsmnm.Tag.T.dto.MasterEventRequestDto;
import com.lsmnm.Tag.T.dto.MasterEventResponseDto;
import com.lsmnm.Tag.T.service.MasterEventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/tag-master-event")
@RequiredArgsConstructor
public class MasterEventController {

    private final MasterEventService masterEventService;

    /**
     * MasterEvent 조회 (단일)
     * GET /tag-master-event/{tagId}/{eventSeq}
     */
    @GetMapping("/{tagId}/{eventSeq}")
    public ResponseEntity<MasterEventResponseDto> getMasterEvent(
            @PathVariable String tagId,
            @PathVariable String eventSeq) {

        log.info("MasterEvent 조회 요청 - tagId: {}, eventSeq: {}", tagId, eventSeq);
        
        MasterEventResponseDto response = masterEventService.getMasterEvent(tagId, eventSeq);
        
        return ResponseEntity.ok(response);
    }

    /**
     * MasterEvent 검색 (리스트)
     * POST /tag-master-event/search
     */
    @PostMapping("/search")
    public ResponseEntity<Map<String, Object>> searchMasterEvents(
            @RequestBody MasterEventRequestDto requestDto) {

        log.info("MasterEvent 검색 요청 - {}", requestDto);
        
        List<MasterEventResponseDto> events = masterEventService.searchMasterEvents(requestDto);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", events);
        response.put("total", events.size());
        
        return ResponseEntity.ok(response);
    }

    /**
     * MasterEvent 생성
     * POST /tag-master-event
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createMasterEvent(
            @RequestBody MasterEventRequestDto requestDto) {

        log.info("MasterEvent 생성 요청 - {}", requestDto);
        
        MasterEventResponseDto response = masterEventService.createMasterEvent(requestDto);
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "MasterEvent가 성공적으로 생성되었습니다.");
        result.put("data", response);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    /**
     * MasterEvent 수정
     * PUT /tag-master-event/{tagId}/{eventSeq}
     */
    @PutMapping("/{tagId}/{eventSeq}")
    public ResponseEntity<Map<String, Object>> updateMasterEvent(
            @PathVariable String tagId,
            @PathVariable String eventSeq,
            @RequestBody MasterEventRequestDto requestDto) {

        log.info("MasterEvent 수정 요청 - tagId: {}, eventSeq: {}, {}", tagId, eventSeq, requestDto);
        
        MasterEventResponseDto response = masterEventService.updateMasterEvent(tagId, eventSeq, requestDto);
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "MasterEvent가 성공적으로 수정되었습니다.");
        result.put("data", response);
        
        return ResponseEntity.ok(result);
    }

    /**
     * MasterEvent 삭제
     * DELETE /tag-master-event/{tagId}/{eventSeq}
     */
    @DeleteMapping("/{tagId}/{eventSeq}")
    public ResponseEntity<Map<String, Object>> deleteMasterEvent(
            @PathVariable String tagId,
            @PathVariable String eventSeq) {

        log.info("MasterEvent 삭제 요청 - tagId: {}, eventSeq: {}", tagId, eventSeq);
        
        masterEventService.deleteMasterEvent(tagId, eventSeq);
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "MasterEvent가 성공적으로 삭제되었습니다.");
        
        return ResponseEntity.ok(result);
    }

    /**
     * MasterEvent 일괄 삭제 (tagId 기준)
     * DELETE /tag-master-event/tag/{tagId}
     */
    @DeleteMapping("/tag/{tagId}")
    public ResponseEntity<Map<String, Object>> deleteMasterEventsByTagId(
            @PathVariable String tagId) {

        log.info("MasterEvent 일괄 삭제 요청 - tagId: {}", tagId);
        
        masterEventService.deleteMasterEventsByTagId(tagId);
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", String.format("tagId [%s]에 해당하는 모든 MasterEvent가 성공적으로 삭제되었습니다.", tagId));
        
        return ResponseEntity.ok(result);
    }
}
