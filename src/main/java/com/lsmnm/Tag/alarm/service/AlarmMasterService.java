package com.lsmnm.Tag.alarm.service;

import com.lsmnm.Tag.alarm.dto.*;
import com.lsmnm.Tag.alarm.repository.AlarmMasterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlarmMasterService {

    private final AlarmMasterRepository alarmMasterRepository;

    /**
     * 알람 마스터 조회
     */
    public AlarmMasterListResponseDto searchAlarmMasters(AlarmMasterSearchRequestDto requestDto) {

        List<AlarmMasterProjection> projections = alarmMasterRepository.searchAlarmMasters(
                requestDto.getPlantCd(),
                getOrDefault(requestDto.getBizChainCd()),
                getOrDefault(requestDto.getAlarmType()),
                getOrDefault(requestDto.getAlarmId()),
                getOrDefault(requestDto.getAlarmMsgId()),
                getOrDefault(requestDto.getAlarmMsgContents())
        );

        List<AlarmMasterSearchResponseDto> alarmMasters = projections.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        // 100개씩 끊어서 Response 값 전달
        List<List<AlarmMasterSearchResponseDto>> chunkedList = IntStream.range(0, alarmMasters.size())
                .boxed()
                .collect(Collectors.groupingBy(i -> i / 100))
                .values()
                .stream()
                .map(indices -> indices.stream()
                        .map(alarmMasters::get)
                        .collect(Collectors.toList()))
                .collect(Collectors.toList());

        // 조회 데이터 갯수 (statusMsg)
        int recordCount = alarmMasters.size();
        String statusMsg = String.format("[%s] %d record have been selected",
                java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                recordCount);

        return AlarmMasterListResponseDto.builder()
                .displaymsg(null)
                .isSuccess(true)
                .statusMsg(statusMsg)
                .RK_ALARM(chunkedList)
                .build();
    }

    /**
     * 알람 사용자 정보 조회
     */
    public List<AlarmUserResponseDto> getAlarmUser(AlarmUserRequestDto requestDto) {
        return alarmMasterRepository.findAlarmUser(requestDto.getAlarmUserType() , requestDto.getAlarmUserId(),
                requestDto.getAlarmUserNm(), requestDto.getAlarmToRole(), requestDto.getAlarmToUser(), requestDto.getAlarmToUser2());
    }

    /**
     * Projection -> DTO
     */
    private AlarmMasterSearchResponseDto convertToDto(AlarmMasterProjection projection) {
        return AlarmMasterSearchResponseDto.builder()
                .plantCd(projection.getPlantCd())
                .alarmId(projection.getAlarmId())
                .bizChainCd(projection.getBizChainCd())
                .alarmType(projection.getAlarmType())
                .alarmMsgId(projection.getAlarmMsgId())
                .alarmMsgContents(projection.getAlarmMsgContents())
                .alarmBlink(projection.getAlarmBlink())
                .alarmAutoClose(projection.getAlarmAutoClose())
                .alarmAutoPop(projection.getAlarmAutoPop())
                .alarmVoice(projection.getAlarmVoice())
                .alarmInvokeInterval(projection.getAlarmInvokeInterval())
                .alarmToUser(projection.getAlarmToUser())
                .alarmToRole(projection.getAlarmToRole())
                .alarmActionType(projection.getAlarmActionType())
                .pageLinkId(projection.getPageLinkId())
                .confMsgId(projection.getConfMsgId())
                .confMsgType(projection.getConfMsgType())
                .confMsgContents(projection.getConfMsgContents())
                .confMsgParam1(projection.getConfMsgParam1())
                .confMsgParam2(projection.getConfMsgParam2())
                .confMsgParam3(projection.getConfMsgParam3())
                .confNow(projection.getConfNow())
                .alarmDetectInterval(projection.getAlarmDetectInterval())
                .dispAlarmTm(projection.getDispAlarmTm())
                .alarmUseYn(projection.getAlarmUseYn())
                .alarmUsage(projection.getAlarmUsage())
                .alarmRemarks(projection.getAlarmRemarks())
                .alarmSmsFl(projection.getAlarmSmsFl())
                .alarmKakaoFl(projection.getAlarmKakaoFl())
                .alarmEmailFl(projection.getAlarmEmailFl())
                .alarmToUser2(projection.getAlarmToUser2())
                .alarmSmsFl2(projection.getAlarmSmsFl2())
                .alarmEmailFl2(projection.getAlarmEmailFl2())
                .alarmSmsTimeFl(projection.getAlarmSmsTimeFl())
                .alarmKakaoTimeFl(projection.getAlarmKakaoTimeFl())
                .alarmKakaoTimeCl(projection.getAlarmKakaoTimeCl())
                .emailTitle(projection.getEmailTitle())
                .jqxCb("false")
                .build();
    }

    /**
     * null 체크 및 기본값
     */
    private String getOrDefault(String value) {
        return value != null ? value : "";
    }
}

