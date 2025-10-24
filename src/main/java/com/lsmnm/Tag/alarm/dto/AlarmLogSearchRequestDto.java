package com.lsmnm.Tag.alarm.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmLogSearchRequestDto {
    
    private String plantCd;
    private String alarmType;
    private String alarmLogId;
    private String alarmId;
    private String alarmMsgId;
    private String alarmDtmSta;
    private String alarmDtmEnd;
    private String confYn;
    private String bizChainCd;
    private String alarmSendType;
    private String alarmMsgContents;
    private String alarmMsgAttrs;
}

