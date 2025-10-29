package com.lsmnm.Tag.T.controller;

import com.lsmnm.Tag.T.dto.*;
import com.lsmnm.Tag.T.service.MasterEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tag-master-event")
@RequiredArgsConstructor
public class MasterEventController {

    private final MasterEventService masterEventService;

    /**
     * Tag 이벤트 / 알람 Data Select
     */
    @GetMapping("/search")
    public ResponseEntity<List<MasterEventSearchResponseDto>> getAlarmUser(@RequestBody MasterEventSearchRequestDto masterEventSearchRequestDto) {

        List<MasterEventSearchResponseDto> searchList = masterEventService.getMasterEventSearch(masterEventSearchRequestDto);

        return ResponseEntity.ok(searchList);
    }

    /**
     * Tag 이벤트 /알람 Data Upsert
     */
    @PostMapping("/save")
    public ResponseEntity<Void> saveMasterEvent(@RequestBody MasterEventSaveDto masterEventSaveDto) {

        masterEventService.saveEvent(masterEventSaveDto);

        return ResponseEntity.ok().build();
    }

    /**
     * Tag 이벤트 /알람 Data Delete
     */
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteMasterEvent(@RequestBody MasterEventDeleteDto masterEventDeleteDto) {

        masterEventService.deleteMasterEvent(masterEventDeleteDto);

        return ResponseEntity.ok().build();
    }
}
