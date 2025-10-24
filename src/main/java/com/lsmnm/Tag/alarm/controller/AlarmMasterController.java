package com.lsmnm.Tag.alarm.controller;

import com.lsmnm.Tag.alarm.dto.AlarmMasterListResponseDto;
import com.lsmnm.Tag.alarm.dto.AlarmMasterSearchRequestDto;
import com.lsmnm.Tag.alarm.service.AlarmMasterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/alarm-master")
@RequiredArgsConstructor
public class AlarmMasterController {

    private final AlarmMasterService alarmMasterService;

    /**
     * 알람 관리 조회
     */
    @PostMapping("/search")
    public ResponseEntity<AlarmMasterListResponseDto> searchAlarmMasters(@RequestBody AlarmMasterSearchRequestDto requestDto) {

        AlarmMasterListResponseDto response = alarmMasterService.searchAlarmMasters(requestDto);

        return ResponseEntity.ok(response);
    }
}

