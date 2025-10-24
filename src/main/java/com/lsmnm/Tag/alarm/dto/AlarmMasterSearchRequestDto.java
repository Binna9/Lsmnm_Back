package com.lsmnm.Tag.alarm.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmMasterSearchRequestDto {
    
    private String plantCd;
    private String bizChainCd;
    private String alarmType;
    private String alarmId;
    private String alarmMsgId;
    private String alarmMsgContents;
}

