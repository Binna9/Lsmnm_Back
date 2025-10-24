package com.lsmnm.Tag.alarm.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmMasterRequestDto {
    
    private String plantCd;
    private String bizChainCd;
    private String alarmType;
    private String alarmId;
    private String alarmMsgId;
    private String alarmMsgContents;
}

