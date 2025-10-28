package com.lsmnm.Tag.alarm.controller;

import com.lsmnm.Tag.alarm.dto.*;
import com.lsmnm.Tag.alarm.service.AlarmMasterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    /**
     * 알람 사용자 정보 조회
     */
    @GetMapping("/users")
    public ResponseEntity<List<AlarmUserResponseDto>> getAlarmUser(@RequestBody AlarmUserRequestDto alarmUserRequestDto) {

        List<AlarmUserResponseDto> alarmUsers = alarmMasterService.getAlarmUser(alarmUserRequestDto);

        return ResponseEntity.ok(alarmUsers);
    }

    @GetMapping("/groups")
    public ResponseEntity<List<AlarmGroupResponseDto>> getAlarmGroup(@RequestBody AlarmGroupRequestDto alarmGroupRequestDto) {

        List<AlarmGroupResponseDto> alarmGroups = alarmMasterService.getAlarmGroup(alarmGroupRequestDto);

        return ResponseEntity.ok(alarmGroups);
    }
}

