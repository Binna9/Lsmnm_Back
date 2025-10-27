package com.lsmnm.Tag.alarm.service;

import com.lsmnm.Tag.alarm.dto.*;
import com.lsmnm.Tag.alarm.repository.AlarmLogRepository;
import com.lsmnm.Tag.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlarmLogService {

    private final AlarmLogRepository alarmLogRepository;

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

        List<AlarmLogProjection> projections = alarmLogRepository.searchAlarmLogs(
                requestDto.getPlantCd(),
                getOrDefault(requestDto.getAlarmType()),
                getOrDefault(requestDto.getAlarmLogId()),
                getOrDefault(requestDto.getAlarmId()),
                getOrDefault(requestDto.getAlarmMsgId()),
                requestDto.getAlarmDtmSta(),
                requestDto.getAlarmDtmEnd(),
                getOrDefault(requestDto.getConfYn()),
                getOrDefault(requestDto.getBizChainCd()),
                getOrDefault(requestDto.getAlarmSendType()),
                getOrDefault(requestDto.getAlarmMsgContents()),
                getOrDefault(requestDto.getAlarmMsgAttrs())
        );

        List<AlarmLogSearchResponseDto> alarmLogs = projections.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

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
     * 알람 사용자 로그 정보 조회
     */
    public List<AlarmUserLogResponseDto> getAlarmLogUser(AlarmUserLogRequestDto requestDto) {

        return alarmLogRepository.findAlarmLogUserByAlarmIdAndDtm(requestDto.getAlarmId(), requestDto.getAlarmDtm());
    }

    /**
     * Projection -> DTO
     */
    private AlarmLogSearchResponseDto convertToDto(AlarmLogProjection projection) {
        return AlarmLogSearchResponseDto.builder()
                .plantCd(projection.getPlantCd())
                .bizChainCd(projection.getBizChainCd())
                .alarmLogId(projection.getAlarmLogId())
                .alarmId(projection.getAlarmId())
                .alarmType(projection.getAlarmType())
                .alarmMsgId(projection.getAlarmMsgId())
                .alarmDtm(projection.getAlarmDtm())
                .confYn(projection.getConfYn())
                .confDtm(projection.getConfDtm())
                .alarmMsgContents(projection.getAlarmMsgContents())
                .alarmMsgAttrs(projection.getAlarmMsgAttrs())
                .emailSendYn(projection.getEmailSendYn())
                .smsSendYn(projection.getSmsSendYn())
                .kakaoSendYn(projection.getKakaoSendYn())
                .build();
    }

    /**
     * null 체크 및 기본값
     */
    private String getOrDefault(String value) {
        return value != null ? value : "";
    }
}
