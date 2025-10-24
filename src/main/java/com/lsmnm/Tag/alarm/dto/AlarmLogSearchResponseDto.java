package com.lsmnm.Tag.alarm.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmLogSearchResponseDto {
    
    private String plantCd;
    private String alarmType;
    private String alarmLogId;
    private String jqxCb;
    private String alarmDtm;
    private String alarmMsgContents;
    private String confYn;
    private String smsSendYn;
    private String kakaoSendYn;
    private String alarmId;
    private String alarmMsgId;
    private String bizChainCd;
    private String emailSendYn;
    private String confDtm;
    private String alarmMsgAttrs;
}

