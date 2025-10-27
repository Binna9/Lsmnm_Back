package com.lsmnm.Tag.alarm.dto;

public interface AlarmLogProjection {
    String getPlantCd();
    String getBizChainCd();
    String getAlarmLogId();
    String getAlarmId();
    String getAlarmType();
    String getAlarmMsgId();
    String getAlarmDtm();
    String getConfYn();
    String getConfDtm();
    String getAlarmMsgContents();
    String getAlarmMsgAttrs();
    String getEmailSendYn();
    String getSmsSendYn();
    String getKakaoSendYn();
}
