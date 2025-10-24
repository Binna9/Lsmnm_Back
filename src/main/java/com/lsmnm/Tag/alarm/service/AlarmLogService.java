package com.lsmnm.Tag.alarm.service;

import com.lsmnm.Tag.alarm.dto.AlarmUserDto;
import com.lsmnm.Tag.alarm.dto.AlarmLogSearchResponseDto;
import com.lsmnm.Tag.alarm.dto.AlarmLogSearchRequestDto;
import com.lsmnm.Tag.alarm.dto.AlarmLogListResponseDto;
import com.lsmnm.Tag.alarm.repository.AlarmLogRepository;
import com.lsmnm.Tag.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlarmLogService {

    private final AlarmLogRepository alarmLogRepository;

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

        List<AlarmLogSearchResponseDto> alarmLogs = alarmLogRepository.searchAlarmLogs(
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
     * null 체크 및 기본값
     */
    private String getOrDefault(String value) {
        return value != null ? value : "";
    }
}
