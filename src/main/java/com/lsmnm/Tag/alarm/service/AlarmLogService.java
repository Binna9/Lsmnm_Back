package com.lsmnm.Tag.alarm.service;

import com.lsmnm.Tag.alarm.dto.*;
import com.lsmnm.Tag.alarm.repository.AlarmLogRepository;
import com.lsmnm.Tag.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlarmLogService {

    private final AlarmLogRepository alarmLogRepository;

    /**
     * 알람 로그 검색
     */
    public AlarmLogListResponseDto searchAlarmLogs(AlarmLogSearchRequestDto requestDto) {

            String alarmType      = toNullIfEmpty(requestDto.getAlarmType());
            String alarmLogId     = toNullIfEmpty(requestDto.getAlarmLogId());
            String alarmId        = toNullIfEmpty(requestDto.getAlarmId());
            String alarmMsgId     = toNullIfEmpty(requestDto.getAlarmMsgId());
            String confYn         = toNullIfEmpty(requestDto.getConfYn());
            String bizChainCd     = toNullIfEmpty(requestDto.getBizChainCd());
            String alarmSendType  = toNullIfEmpty(requestDto.getAlarmSendType());
            String alarmMsgCont   = toNullIfEmpty(requestDto.getAlarmMsgContents());
            String alarmMsgAttrs  = toNullIfEmpty(requestDto.getAlarmMsgAttrs());
            String alarmDtmSta    = toNullIfEmpty(requestDto.getAlarmDtmSta());
            String alarmDtmEnd    = toNullIfEmpty(requestDto.getAlarmDtmEnd());

        List<AlarmLogProjection> projections = alarmLogRepository.searchAlarmLogs(
                requestDto.getPlantCd(),
                alarmType,
                alarmLogId,
                alarmId,
                alarmMsgId,
                alarmDtmSta,
                alarmDtmEnd,
                confYn,
                bizChainCd,
                alarmSendType,
                alarmMsgCont,
                alarmMsgAttrs
        );

        List<AlarmLogSearchResponseDto> alarmLogs = projections.stream()
                .map(this::convertToDto)
                .toList();

        // 100개씩 끊어서 Response 값 전달
        List<List<AlarmLogSearchResponseDto>> chunkedList = IntStream.range(0, alarmLogs.size())
                .boxed()
                .collect(Collectors.groupingBy(i -> i / 100))
                .values()
                .stream()
                .map(indices -> indices.stream()
                        .map(alarmLogs::get)
                        .collect(Collectors.toList()))
                .collect(Collectors.toList());

        int recordCount = alarmLogs.size();
        String statusMsg = String.format("[%s] %d record have been selected",
                java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                recordCount);

        return AlarmLogListResponseDto.builder()
                .displaymsg(null)
                .isSuccess(true)
                .statusMsg(statusMsg)
                .rkAlarmLog(chunkedList)
                .build();
    }

    /**
     * 알람 사용자 로그 정보 조회
     */
    public List<AlarmUserLogResponseDto> getAlarmLogUser(AlarmUserLogRequestDto requestDto) {

        var id = Optional.ofNullable(requestDto.getAlarmId())
                .filter(StringUtils::hasText)
                .orElseThrow(() -> new BadRequestException("Not Found Id"));

        var time = Optional.ofNullable(requestDto.getAlarmDtm())
                .filter(StringUtils::hasText)
                .orElseThrow(() -> new BadRequestException("Not Found Dtm"));

        return alarmLogRepository.findAlarmLogUserByAlarmIdAndDtm(id,time);
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
                .jqxCb(false)
                .build();
    }

    /**
     * null 체크 및 기본값
     */
    private String getOrDefault(String value) {
        return value != null ? value : "";
    }

    /**
     * 빈 문자열을 null 로 변환 (PostgreSQL 파라미터 타입 추론 오류 방지)
     */
    private String toNullIfEmpty(String value) {
        return StringUtils.hasText(value) ? value : null;
    }
}
