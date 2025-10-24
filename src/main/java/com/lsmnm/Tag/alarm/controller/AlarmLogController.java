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
     * 복합키로 알람 로그 조회
     */
    @GetMapping("/{plantCd}/{alarmLogId}")
    public ResponseEntity<AlarmLogDto> getAlarmLogById(
            @PathVariable String plantCd,
            @PathVariable String alarmLogId) {
        Optional<AlarmLogDto> alarmLog = alarmLogService.getAlarmLogById(plantCd, alarmLogId);
        return alarmLog.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * 공장코드로 알람 로그 조회
     */
    @GetMapping("/plant/{plantCd}")
    public ResponseEntity<List<AlarmLogDto>> getAlarmLogsByPlantCd(@PathVariable String plantCd) {
        List<AlarmLogDto> alarmLogs = alarmLogService.getAlarmLogsByPlantCd(plantCd);
        return ResponseEntity.ok(alarmLogs);
    }

    /**
     * 알람 타입으로 조회
     */
    @GetMapping("/type/{alarmType}")
    public ResponseEntity<List<AlarmLogDto>> getAlarmLogsByType(@PathVariable String alarmType) {
        List<AlarmLogDto> alarmLogs = alarmLogService.getAlarmLogsByType(alarmType);
        return ResponseEntity.ok(alarmLogs);
    }

    /**
     * 확인 여부로 조회
     */
    @GetMapping("/confirmation/{confYn}")
    public ResponseEntity<List<AlarmLogDto>> getAlarmLogsByConfYn(@PathVariable String confYn) {
        List<AlarmLogDto> alarmLogs = alarmLogService.getAlarmLogsByConfYn(confYn);
        return ResponseEntity.ok(alarmLogs);
    }

    /**
     * 기간별 알람 로그 조회
     */
    @GetMapping("/date-range")
    public ResponseEntity<List<AlarmLogDto>> getAlarmLogsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<AlarmLogDto> alarmLogs = alarmLogService.getAlarmLogsByDateRange(startDate, endDate);
        return ResponseEntity.ok(alarmLogs);
    }

    /**
     * 최근 알람 로그 조회 (페이징)
     */
    @GetMapping("/recent")
    public ResponseEntity<Page<AlarmLogDto>> getRecentAlarmLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<AlarmLogDto> alarmLogPage = alarmLogService.getRecentAlarmLogs(page, size);
        return ResponseEntity.ok(alarmLogPage);
    }

    /**
     * 알람 ID와 날짜로 사용자 정보 조회
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
