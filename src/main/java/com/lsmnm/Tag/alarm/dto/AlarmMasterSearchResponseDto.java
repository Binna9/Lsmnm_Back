package com.lsmnm.Tag.alarm.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmMasterSearchResponseDto {
    
    private String plantCd;
    private String alarmId;
    private String bizChainCd;
    private String alarmType;
    private String alarmMsgId;
    private String alarmMsgContents;
    private String alarmBlink;
    private String alarmAutoClose;
    private String alarmAutoPop;
    private String alarmVoice;
    private Integer alarmInvokeInterval;
    private String alarmToUser;
    private String alarmToRole;
    private String alarmActionType;
    private String pageLinkId;
    private String confMsgId;
    private String confMsgType;
    private String confMsgContents;
    private String confMsgParam1;
    private String confMsgParam2;
    private String confMsgParam3;
    private String confNow;
    private String alarmDetectInterval;
    private String dispAlarmTm;
    private String alarmUseYn;
    private String alarmUsage;
    private String alarmRemarks;
    private String alarmSmsFl;
    private String alarmKakaoFl;
    private String alarmEmailFl;
    private String alarmToUser2;
    private String alarmSmsFl2;
    private String alarmEmailFl2;
    private String alarmSmsTimeFl;
    private String alarmKakaoTimeFl;
    private String alarmKakaoTimeCl;
    private String emailTitle;
    private String jqxCb;
}
