package com.lsmnm.Tag.alarm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmLogSearchResponseDto {

    @JsonProperty("PLANT_CD")
    private String plantCd;
    @JsonProperty("ALARM_TYPE")
    private String alarmType;
    @JsonProperty("ALARM_LOG_ID")
    private String alarmLogId;
    @JsonProperty("ALARM_DTM")
    private String alarmDtm;
    @JsonProperty("ALARM_MSG_CONTENTS")
    private String alarmMsgContents;
    @JsonProperty("CONF_YN")
    private String confYn;
    @JsonProperty("SMS_SEND_YN")
    private String smsSendYn;
    @JsonProperty("KAKAO_SEND_YN")
    private String kakaoSendYn;
    @JsonProperty("ALARM_ID")
    private String alarmId;
    @JsonProperty("ALARM_MSG_ID")
    private String alarmMsgId;
    @JsonProperty("BIZ_CHAIN_CD")
    private String bizChainCd;
    @JsonProperty("EMAIL_SEND_YN")
    private String emailSendYn;
    @JsonProperty("CONF_DTM")
    private String confDtm;
    @JsonProperty("ALARM_MSG_ATTRS")
    private String alarmMsgAttrs;
    @JsonProperty("JQX_CB")
    private Boolean jqxCb;
}

