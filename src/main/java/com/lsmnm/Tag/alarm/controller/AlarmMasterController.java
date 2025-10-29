package com.lsmnm.Tag.alarm.controller;

import com.lsmnm.Tag.T.dto.MasterEventDeleteDto;
import com.lsmnm.Tag.alarm.dto.*;
import com.lsmnm.Tag.alarm.service.AlarmLogService;
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
    private final AlarmLogService alarmLogService;

    /**
     * 알람 관리 Data Select
     */
    @PostMapping("/search")
    public ResponseEntity<AlarmMasterListResponseDto> searchAlarmMasters(@RequestBody AlarmMasterSearchRequestDto requestDto) {

        AlarmMasterListResponseDto response = alarmMasterService.searchAlarmMasters(requestDto);

        return ResponseEntity.ok(response);
    }

    /**
     * 알람 사용자 Data Select
     */
    @GetMapping("/users")
    public ResponseEntity<List<AlarmUserResponseDto>> getAlarmUser(@RequestBody AlarmUserRequestDto alarmUserRequestDto) {

        List<AlarmUserResponseDto> alarmUsers = alarmMasterService.getAlarmUser(alarmUserRequestDto);

        return ResponseEntity.ok(alarmUsers);
    }

    /**
     * 알람 그룹 Data Select
     */
    @GetMapping("/groups")
    public ResponseEntity<List<AlarmGroupResponseDto>> getAlarmGroup(@RequestBody AlarmGroupRequestDto alarmGroupRequestDto) {

        List<AlarmGroupResponseDto> alarmGroups = alarmMasterService.getAlarmGroup(alarmGroupRequestDto);

        return ResponseEntity.ok(alarmGroups);
    }

    /**
     * 알람 관리 Data Delete
     */
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteALarmMaster(@RequestBody AlarmMasterDeleteDto alarmMasterDeleteDto) {

        alarmMasterService.deleteAlarmMasterService(alarmMasterDeleteDto);

        return ResponseEntity.ok().build();
    }
}

