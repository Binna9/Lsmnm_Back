package com.lsmnm.Tag.alarm.controller;

import com.lsmnm.Tag.alarm.dto.AlarmLogDto;
import com.lsmnm.Tag.alarm.dto.AlarmLogSearchDto;
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
        log.info("전체 알람 로그 조회 API 호출");
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
        log.info("알람 로그 조회 API 호출 - plantCd: {}, alarmLogId: {}", plantCd, alarmLogId);
        Optional<AlarmLogDto> alarmLog = alarmLogService.getAlarmLogById(plantCd, alarmLogId);
        return alarmLog.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * 공장코드로 알람 로그 조회
     */
    @GetMapping("/plant/{plantCd}")
    public ResponseEntity<List<AlarmLogDto>> getAlarmLogsByPlantCd(@PathVariable String plantCd) {
        log.info("공장코드별 알람 로그 조회 API 호출 - plantCd: {}", plantCd);
        List<AlarmLogDto> alarmLogs = alarmLogService.getAlarmLogsByPlantCd(plantCd);
        return ResponseEntity.ok(alarmLogs);
    }

    /**
     * 알람 타입으로 조회
     */
    @GetMapping("/type/{alarmType}")
    public ResponseEntity<List<AlarmLogDto>> getAlarmLogsByType(@PathVariable String alarmType) {
        log.info("알람 타입별 조회 API 호출 - alarmType: {}", alarmType);
        List<AlarmLogDto> alarmLogs = alarmLogService.getAlarmLogsByType(alarmType);
        return ResponseEntity.ok(alarmLogs);
    }

    /**
     * 확인 여부로 조회
     */
    @GetMapping("/confirmation/{confYn}")
    public ResponseEntity<List<AlarmLogDto>> getAlarmLogsByConfYn(@PathVariable String confYn) {
        log.info("확인 여부별 조회 API 호출 - confYn: {}", confYn);
        List<AlarmLogDto> alarmLogs = alarmLogService.getAlarmLogsByConfYn(confYn);
        return ResponseEntity.ok(alarmLogs);
    }

    /**
     * 미확인 알람 조회
     */
    @GetMapping("/unconfirmed")
    public ResponseEntity<List<AlarmLogDto>> getUnconfirmedAlarms() {
        log.info("미확인 알람 조회 API 호출");
        List<AlarmLogDto> alarmLogs = alarmLogService.getUnconfirmedAlarms();
        return ResponseEntity.ok(alarmLogs);
    }

    /**
     * 기간별 알람 로그 조회
     */
    @GetMapping("/date-range")
    public ResponseEntity<List<AlarmLogDto>> getAlarmLogsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        log.info("기간별 알람 로그 조회 API 호출 - startDate: {}, endDate: {}", startDate, endDate);
        List<AlarmLogDto> alarmLogs = alarmLogService.getAlarmLogsByDateRange(startDate, endDate);
        return ResponseEntity.ok(alarmLogs);
    }

    /**
     * 공장코드와 알람타입으로 조회
     */
    @GetMapping("/plant/{plantCd}/type/{alarmType}")
    public ResponseEntity<List<AlarmLogDto>> getAlarmLogsByPlantCdAndType(
            @PathVariable String plantCd,
            @PathVariable String alarmType) {
        log.info("공장코드와 알람타입으로 조회 API 호출 - plantCd: {}, alarmType: {}", plantCd, alarmType);
        List<AlarmLogDto> alarmLogs = alarmLogService.getAlarmLogsByPlantCdAndType(plantCd, alarmType);
        return ResponseEntity.ok(alarmLogs);
    }

    /**
     * 최근 알람 로그 조회 (페이징)
     */
    @GetMapping("/recent")
    public ResponseEntity<Page<AlarmLogDto>> getRecentAlarmLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("최근 알람 로그 조회 API 호출 - page: {}, size: {}", page, size);
        Page<AlarmLogDto> alarmLogPage = alarmLogService.getRecentAlarmLogs(page, size);
        return ResponseEntity.ok(alarmLogPage);
    }

    /**
     * 검색 조건으로 알람 로그 조회
     */
    @PostMapping("/search")
    public ResponseEntity<List<AlarmLogDto>> searchAlarmLogs(@RequestBody AlarmLogSearchDto searchDto) {
        log.info("검색 조건으로 알람 로그 조회 API 호출 - {}", searchDto);
        List<AlarmLogDto> alarmLogs = alarmLogService.searchAlarmLogs(searchDto);
        return ResponseEntity.ok(alarmLogs);
    }

    /**
     * Query Parameter로 검색
     */
    @GetMapping("/search")
    public ResponseEntity<List<AlarmLogDto>> searchAlarmLogsByQuery(
            @RequestParam(required = false) String plantCd,
            @RequestParam(required = false) String alarmType,
            @RequestParam(required = false) String confYn,
            @RequestParam(required = false) String alarmId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        
        log.info("Query Parameter로 알람 로그 검색 API 호출");
        
        AlarmLogSearchDto searchDto = AlarmLogSearchDto.builder()
                .plantCd(plantCd)
                .alarmType(alarmType)
                .confYn(confYn)
                .alarmId(alarmId)
                .startDate(startDate)
                .endDate(endDate)
                .build();
        
        List<AlarmLogDto> alarmLogs = alarmLogService.searchAlarmLogs(searchDto);
        return ResponseEntity.ok(alarmLogs);
    }
}
