package com.lsmnm.Tag.alarm.controller;

import com.lsmnm.Tag.alarm.dto.AlarmLogSearchRequestDto;
import com.lsmnm.Tag.alarm.dto.AlarmLogListResponseDto;
import com.lsmnm.Tag.alarm.dto.AlarmUserLogRequestDto;
import com.lsmnm.Tag.alarm.dto.AlarmUserLogResponseDto;
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
     * 알람 로그 조회
     */
    @PostMapping("/search")
    public ResponseEntity<AlarmLogListResponseDto> searchAlarmLogs(@RequestBody AlarmLogSearchRequestDto requestDto) {

        AlarmLogListResponseDto response = alarmLogService.searchAlarmLogs(requestDto);

        return ResponseEntity.ok(response);
    }

    /**
     * 알람 로그 사용자 정보 조회
     */
    @GetMapping("/users")
    public ResponseEntity<List<AlarmUserLogResponseDto>> getAlarmLogUser(@RequestBody AlarmUserLogRequestDto alarmUserLogRequestDto) {

        List<AlarmUserLogResponseDto> alarmLogUsers = alarmLogService.getAlarmLogUser(alarmUserLogRequestDto);

        return ResponseEntity.ok(alarmLogUsers);
    }
}
