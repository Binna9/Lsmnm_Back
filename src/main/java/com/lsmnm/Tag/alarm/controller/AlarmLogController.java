package com.lsmnm.Tag.alarm.controller;

import com.lsmnm.Tag.alarm.dto.AlarmLogDto;
import com.lsmnm.Tag.alarm.dto.AlarmUserDto;
import com.lsmnm.Tag.alarm.dto.AlarmLogSearchRequestDto;
import com.lsmnm.Tag.alarm.dto.AlarmLogListResponseDto;
import com.lsmnm.Tag.alarm.service.AlarmLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/alarm-log")
@RequiredArgsConstructor
@Slf4j
public class AlarmLogController {

    private final AlarmLogService alarmLogService;

    /**
     * 전체 알람 로그 조회
     */
    @GetMapping
    public ResponseEntity<List<AlarmLogDto>> getAllAlarmLogs() {
        List<AlarmLogDto> alarmLogs = alarmLogService.getAllAlarmLogs();
        return ResponseEntity.ok(alarmLogs);
    }

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
