package com.lsmnm.Tag.alarm.service;

import com.lsmnm.Tag.alarm.dto.AlarmLogDto;
import com.lsmnm.Tag.alarm.dto.AlarmUserDto;
import com.lsmnm.Tag.alarm.dto.AlarmLogResponseDto;
import com.lsmnm.Tag.alarm.dto.AlarmLogSearchRequestDto;
import com.lsmnm.Tag.alarm.dto.AlarmLogListResponseDto;
import com.lsmnm.Tag.alarm.entity.AlarmLog;
import com.lsmnm.Tag.alarm.entity.AlarmLogId;
import com.lsmnm.Tag.alarm.repository.AlarmLogRepository;
import com.lsmnm.Tag.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
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
@Transactional(readOnly = true)
public class AlarmLogService {

    private final AlarmLogRepository alarmLogRepository;

    /**
     * 알람 로그 전체 조회
     */
    public List<AlarmLogDto> getAllAlarmLogs() {
        List<AlarmLog> alarmLogs = alarmLogRepository.findAll();
        
        return alarmLogs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 알람 사용자 정보 조회
     */
    public List<AlarmUserDto> getAlarmUserByAlarmIdAndDtm(String alarmId, String alarmDtm) {
        if (alarmId == null || alarmId.isEmpty()) {
            throw new BadRequestException("error.alarmlog.alarmid.required");
        }
        if (alarmDtm == null || alarmDtm.isEmpty()) {
            throw new BadRequestException("error.alarmlog.alarmdtm.required");
        }
        
        return alarmLogRepository.findAlarmUserByAlarmIdAndDtm(alarmId, alarmDtm);
    }

    /**
     * 알람 로그 복합 검색
     */
    public AlarmLogListResponseDto searchAlarmLogs(AlarmLogSearchRequestDto requestDto) {

        if (requestDto.getPlantCd() == null || requestDto.getPlantCd().isEmpty()) {
            throw new BadRequestException("error.alarmlog.plantcd.required");
        }
        if (requestDto.getAlarmDtmSta() == null || requestDto.getAlarmDtmSta().isEmpty()) {
            throw new BadRequestException("error.alarmlog.alarmdtmsta.required");
        }
        if (requestDto.getAlarmDtmEnd() == null || requestDto.getAlarmDtmEnd().isEmpty()) {
            throw new BadRequestException("error.alarmlog.alarmdtmend.required");
        }

        String alarmType = requestDto.getAlarmType() != null ? requestDto.getAlarmType() : "";
        String alarmLogId = requestDto.getAlarmLogId() != null ? requestDto.getAlarmLogId() : "";
        String alarmId = requestDto.getAlarmId() != null ? requestDto.getAlarmId() : "";
        String alarmMsgId = requestDto.getAlarmMsgId() != null ? requestDto.getAlarmMsgId() : "";
        String confYn = requestDto.getConfYn() != null ? requestDto.getConfYn() : "";
        String bizChainCd = requestDto.getBizChainCd() != null ? requestDto.getBizChainCd() : "";
        String alarmSendType = requestDto.getAlarmSendType() != null ? requestDto.getAlarmSendType() : "";
        String alarmMsgContents = requestDto.getAlarmMsgContents() != null ? requestDto.getAlarmMsgContents() : "";
        String alarmMsgAttrs = requestDto.getAlarmMsgAttrs() != null ? requestDto.getAlarmMsgAttrs() : "";

        List<AlarmLogResponseDto> alarmLogs = alarmLogRepository.searchAlarmLogs(
                requestDto.getPlantCd(),
                alarmType,
                alarmLogId,
                alarmId,
                alarmMsgId,
                requestDto.getAlarmDtmSta(),
                requestDto.getAlarmDtmEnd(),
                confYn,
                bizChainCd,
                alarmSendType,
                alarmMsgContents,
                alarmMsgAttrs
        );

        // jqxCb 필드 추가 (false 로 고정)
        alarmLogs.forEach(log -> log.setJqxCb("false"));

        int recordCount = alarmLogs.size();
        String statusMsg = String.format("[%s] %d record have been selected", 
                java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), 
                recordCount);

        return AlarmLogListResponseDto.builder()
                .displaymsg(null)
                .isSuccess(true)
                .statusMsg(statusMsg)
                .rkAlarmLog(alarmLogs)
                .build();
    }

    /**
     * Entity 를 DTO 로 변환
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
