package com.lsmnm.Tag.alarm.controller;

import com.lsmnm.Tag.alarm.dto.AlarmMasterListResponseDto;
import com.lsmnm.Tag.alarm.dto.AlarmMasterRequestDto;
import com.lsmnm.Tag.alarm.service.AlarmMasterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/alarm-master")
@RequiredArgsConstructor
@Slf4j
public class AlarmMasterController {

    private final AlarmMasterService alarmMasterService;

    /**
     * 알람 마스터 조회
     */
    @PostMapping("/search")
    public ResponseEntity<AlarmMasterListResponseDto> searchAlarmMasters(@RequestBody AlarmMasterRequestDto requestDto) {

        AlarmMasterListResponseDto response = alarmMasterService.searchAlarmMasters(requestDto);

        return ResponseEntity.ok(response);
    }
}

