package com.lsmnm.Tag.alarm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AlarmMasterSearchResponseDto {
    
    @JsonProperty("PLANT_CD")
    private String plantCd;
    @JsonProperty("ALARM_ID")
    private String alarmId;
    @JsonProperty("BIZ_CHAIN_CD")
    private String bizChainCd;
    @JsonProperty("ALARM_TYPE")
    private String alarmType;
    @JsonProperty("ALARM_MSG_ID")
    private String alarmMsgId;
    @JsonProperty("ALARM_MSG_CONTENTS")
    private String alarmMsgContents;
    @JsonProperty("ALARM_BLINK")
    private String alarmBlink;
    @JsonProperty("ALARM_AUTO_CLOSE")
    private String alarmAutoClose;
    @JsonProperty("ALARM_AUTO_POP")
    private String alarmAutoPop;
    @JsonProperty("ALARM_VOICE")
    private String alarmVoice;
    @JsonProperty("ALARM_INVOKE_INTERVAL")
    private Integer alarmInvokeInterval;
    @JsonProperty("ALARM_TO_USER")
    private String alarmToUser;
    @JsonProperty("ALARM_TO_ROLE")
    private String alarmToRole;
    @JsonProperty("ALARM_ACTION_TYPE")
    private String alarmActionType;
    @JsonProperty("PAGE_LINK_ID")
    private String pageLinkId;
    @JsonProperty("CONF_MSG_ID")
    private String confMsgId;
    @JsonProperty("CONF_MSG_TYPE")
    private String confMsgType;
    @JsonProperty("CONF_MSG_CONTENTS")
    private String confMsgContents;
    @JsonProperty("CONF_MSG_PARAM1")
    private String confMsgParam1;
    @JsonProperty("CONF_MSG_PARAM2")
    private String confMsgParam2;
    @JsonProperty("CONF_MSG_PARAM3")
    private String confMsgParam3;
    @JsonProperty("CONF_NOW")
    private String confNow;
    @JsonProperty("ALARM_DETECT_INTERVAL")
    private String alarmDetectInterval;
    @JsonProperty("DISP_ALARM_TM")
    private String dispAlarmTm;
    @JsonProperty("ALARM_USE_YN")
    private String alarmUseYn;
    @JsonProperty("ALARM_USAGE")
    private String alarmUsage;
    @JsonProperty("ALARM_REMARKS")
    private String alarmRemarks;
    @JsonProperty("ALARM_SMS_FL")
    private String alarmSmsFl;
    @JsonProperty("ALARM_KAKAO_FL")
    private String alarmKakaoFl;
    @JsonProperty("ALARM_EMAIL_FL")
    private String alarmEmailFl;
    @JsonProperty("ALARM_TO_USER2")
    private String alarmToUser2;
    @JsonProperty("ALARM_SMS_FL2")
    private String alarmSmsFl2;
    @JsonProperty("ALARM_EMAIL_FL2")
    private String alarmEmailFl2;
    @JsonProperty("ALARM_SMS_TIME_FL")
    private String alarmSmsTimeFl;
    @JsonProperty("ALARM_KAKAO_TIME_FL")
    private String alarmKakaoTimeFl;
    @JsonProperty("ALARM_KAKAO_TIME_CL")
    private String alarmKakaoTimeCl;
    @JsonProperty("EMAIL_TITLE")
    private String emailTitle;
    @JsonProperty("JQX_CB")
    private String jqxCb;
}
