package com.lsmnm.Tag.alarm.service;

import com.lsmnm.Tag.alarm.dto.AlarmLogDto;
import com.lsmnm.Tag.alarm.dto.AlarmLogSearchDto;
import com.lsmnm.Tag.alarm.entity.AlarmLog;
import com.lsmnm.Tag.alarm.entity.AlarmLogId;
import com.lsmnm.Tag.alarm.repository.AlarmLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class AlarmLogService {

    private final AlarmLogRepository alarmLogRepository;

    /**
     * 알람 로그 전체 조회
     */
    public List<AlarmLogDto> getAllAlarmLogs() {
        log.info("전체 알람 로그 조회");
        List<AlarmLog> alarmLogs = alarmLogRepository.findAll();
        return alarmLogs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 복합키로 알람 로그 조회
     */
    public Optional<AlarmLogDto> getAlarmLogById(String plantCd, String alarmLogId) {
        log.info("알람 로그 조회 - plantCd: {}, alarmLogId: {}", plantCd, alarmLogId);
        AlarmLogId id = AlarmLogId.builder()
                .plantCd(plantCd)
                .alarmLogId(alarmLogId)
                .build();
        
        return alarmLogRepository.findById(id)
                .map(this::convertToDto);
    }

    /**
     * 공장코드로 알람 로그 조회
     */
    public List<AlarmLogDto> getAlarmLogsByPlantCd(String plantCd) {
        log.info("공장코드별 알람 로그 조회 - plantCd: {}", plantCd);
        List<AlarmLog> alarmLogs = alarmLogRepository.findByIdPlantCd(plantCd);
        return alarmLogs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 알람 타입으로 조회
     */
    public List<AlarmLogDto> getAlarmLogsByType(String alarmType) {
        log.info("알람 타입별 조회 - alarmType: {}", alarmType);
        List<AlarmLog> alarmLogs = alarmLogRepository.findByAlarmType(alarmType);
        return alarmLogs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 확인 여부로 조회
     */
    public List<AlarmLogDto> getAlarmLogsByConfYn(String confYn) {
        log.info("확인 여부별 조회 - confYn: {}", confYn);
        List<AlarmLog> alarmLogs = alarmLogRepository.findByConfYn(confYn);
        return alarmLogs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 미확인 알람 조회
     */
    public List<AlarmLogDto> getUnconfirmedAlarms() {
        log.info("미확인 알람 조회");
        List<AlarmLog> alarmLogs = alarmLogRepository.findUnconfirmedAlarms();
        return alarmLogs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 기간별 알람 로그 조회
     */
    public List<AlarmLogDto> getAlarmLogsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        log.info("기간별 알람 로그 조회 - startDate: {}, endDate: {}", startDate, endDate);
        List<AlarmLog> alarmLogs = alarmLogRepository.findByCrtTmBetween(startDate, endDate);
        return alarmLogs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 공장코드와 알람타입으로 조회
     */
    public List<AlarmLogDto> getAlarmLogsByPlantCdAndType(String plantCd, String alarmType) {
        log.info("공장코드와 알람타입으로 조회 - plantCd: {}, alarmType: {}", plantCd, alarmType);
        List<AlarmLog> alarmLogs = alarmLogRepository.findByIdPlantCdAndAlarmType(plantCd, alarmType);
        return alarmLogs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 최근 알람 로그 조회 (페이징)
     */
    public Page<AlarmLogDto> getRecentAlarmLogs(int page, int size) {
        log.info("최근 알람 로그 조회 - page: {}, size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "crtTm"));
        Page<AlarmLog> alarmLogPage = alarmLogRepository.findAll(pageable);
        
        return alarmLogPage.map(this::convertToDto);
    }

    /**
     * 검색 조건으로 알람 로그 조회
     */
    public List<AlarmLogDto> searchAlarmLogs(AlarmLogSearchDto searchDto) {
        log.info("검색 조건으로 알람 로그 조회 - {}", searchDto);
        
        List<AlarmLog> alarmLogs;
        
        // 검색 조건에 따른 분기
        if (searchDto.getPlantCd() != null && searchDto.getAlarmType() != null) {
            alarmLogs = alarmLogRepository.findByIdPlantCdAndAlarmType(
                    searchDto.getPlantCd(), searchDto.getAlarmType());
        } else if (searchDto.getPlantCd() != null) {
            alarmLogs = alarmLogRepository.findByIdPlantCd(searchDto.getPlantCd());
        } else if (searchDto.getAlarmType() != null) {
            alarmLogs = alarmLogRepository.findByAlarmType(searchDto.getAlarmType());
        } else if (searchDto.getConfYn() != null) {
            alarmLogs = alarmLogRepository.findByConfYn(searchDto.getConfYn());
        } else if (searchDto.getStartDate() != null && searchDto.getEndDate() != null) {
            alarmLogs = alarmLogRepository.findByCrtTmBetween(
                    searchDto.getStartDate(), searchDto.getEndDate());
        } else {
            alarmLogs = alarmLogRepository.findRecentAlarms();
        }
        
        return alarmLogs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Entity를 DTO로 변환
     */
    private AlarmLogDto convertToDto(AlarmLog alarmLog) {
        return AlarmLogDto.builder()
                .plantCd(alarmLog.getId().getPlantCd())
                .alarmLogId(alarmLog.getId().getAlarmLogId())
                .crtUserId(alarmLog.getCrtUserId())
                .crtObjId(alarmLog.getCrtObjId())
                .crtTm(alarmLog.getCrtTm())
                .updUserId(alarmLog.getUpdUserId())
                .updObjId(alarmLog.getUpdObjId())
                .updTm(alarmLog.getUpdTm())
                .archiveFl(alarmLog.getArchiveFl())
                .alarmId(alarmLog.getAlarmId())
                .alarmType(alarmLog.getAlarmType())
                .alarmMsgId(alarmLog.getAlarmMsgId())
                .alarmMsgContents(alarmLog.getAlarmMsgContents())
                .alarmDtm(alarmLog.getAlarmDtm())
                .confYn(alarmLog.getConfYn())
                .confDtm(alarmLog.getConfDtm())
                .alarmMsgParam1(alarmLog.getAlarmMsgParam1())
                .alarmMsgParam2(alarmLog.getAlarmMsgParam2())
                .alarmMsgParam3(alarmLog.getAlarmMsgParam3())
                .alarmMsgParam4(alarmLog.getAlarmMsgParam4())
                .confMsgParam1(alarmLog.getConfMsgParam1())
                .confMsgParam2(alarmLog.getConfMsgParam2())
                .confMsgParam3(alarmLog.getConfMsgParam3())
                .confMsgParam4(alarmLog.getConfMsgParam4())
                .smsSendYn(alarmLog.getSmsSendYn())
                .smsSendDtm(alarmLog.getSmsSendDtm())
                .inputVal(alarmLog.getInputVal())
                .emailSendYn(alarmLog.getEmailSendYn())
                .emailSendDtm(alarmLog.getEmailSendDtm())
                .emailTitle(alarmLog.getEmailTitle())
                .recvAddr(alarmLog.getRecvAddr())
                .kakaoSendYn(alarmLog.getKakaoSendYn())
                .kakaoSendDtm(alarmLog.getKakaoSendDtm())
                .mgmtAttr1(alarmLog.getMgmtAttr1())
                .mgmtAttr2(alarmLog.getMgmtAttr2())
                .mgmtAttr3(alarmLog.getMgmtAttr3())
                .mgmtAttr4(alarmLog.getMgmtAttr4())
                .mgmtAttr5(alarmLog.getMgmtAttr5())
                .build();
    }
}
