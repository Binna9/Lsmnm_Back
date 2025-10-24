package com.lsmnm.Tag.alarm.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmMasterListResponseDto {
    
    private String displaymsg;
    private List<AlarmMasterResponseDto> RK_ALARM;
}

