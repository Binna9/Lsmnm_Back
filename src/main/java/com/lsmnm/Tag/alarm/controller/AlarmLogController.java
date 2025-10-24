package com.lsmnm.Tag.alarm.controller;

import com.lsmnm.Tag.alarm.dto.AlarmUserDto;
import com.lsmnm.Tag.alarm.dto.AlarmLogSearchRequestDto;
import com.lsmnm.Tag.alarm.dto.AlarmLogListResponseDto;
import com.lsmnm.Tag.alarm.service.AlarmLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alarm-log")
@RequiredArgsConstructor
public class AlarmLogController {

    private final AlarmLogService alarmLogService;

    /**
     * 알람 사용자 정보 조회
     */
    @GetMapping("/users")
    public ResponseEntity<List<AlarmUserDto>> getAlarmUserByAlarmIdAndDtm(
            @RequestParam String alarmId,
            @RequestParam String alarmDtm) {
        List<AlarmUserDto> alarmUsers = alarmLogService.getAlarmUserByAlarmIdAndDtm(alarmId, alarmDtm);
        return ResponseEntity.ok(alarmUsers);
    }

    /**
     * 알람 로그 검색
     */
    @PostMapping("/search")
    public ResponseEntity<AlarmLogListResponseDto> searchAlarmLogs(
            @RequestBody AlarmLogSearchRequestDto requestDto) {
        AlarmLogListResponseDto response = alarmLogService.searchAlarmLogs(requestDto);
        return ResponseEntity.ok(response);
    }
}
