package com.lsmnm.Tag.alarm.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmLogListResponseDto {
    
    private String displaymsg;
    private Boolean isSuccess;
    private String statusMsg;
    private List<AlarmLogResponseDto> rkAlarmLog;
}

