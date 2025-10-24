package com.lsmnm.Tag.alarm.service;

import com.lsmnm.Tag.alarm.dto.AlarmMasterListResponseDto;
import com.lsmnm.Tag.alarm.dto.AlarmMasterRequestDto;
import com.lsmnm.Tag.alarm.dto.AlarmMasterResponseDto;
import com.lsmnm.Tag.alarm.repository.AlarmMasterRepository;
import com.lsmnm.Tag.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlarmMasterService {

    private final AlarmMasterRepository alarmMasterRepository;

    /**
     * 알람 마스터 조회
     */
    public AlarmMasterListResponseDto searchAlarmMasters(AlarmMasterRequestDto requestDto) {
        
        if (requestDto.getPlantCd() == null || requestDto.getPlantCd().isEmpty()) {
            throw new BadRequestException("error.alarmmaster.plantcd.required");
        }

        List<AlarmMasterResponseDto> alarmMasters = alarmMasterRepository.searchAlarmMasters(
                requestDto.getPlantCd(),
                getOrDefault(requestDto.getBizChainCd()),
                getOrDefault(requestDto.getAlarmType()),
                getOrDefault(requestDto.getAlarmId()),
                getOrDefault(requestDto.getAlarmMsgId()),
                getOrDefault(requestDto.getAlarmMsgContents())
        );

        // jqxCb 필드 추가 (false 로 고정)
        alarmMasters.forEach(alarm -> alarm.setJqxCb("false"));

        return AlarmMasterListResponseDto.builder()
                .displaymsg(null)
                .RK_ALARM(alarmMasters)
                .build();
    }

    /**
     * null 체크 및 기본값 반환 헬퍼 메서드
     */
    private String getOrDefault(String value) {
        return value != null ? value : "";
    }
}

