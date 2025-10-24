package com.lsmnm.Tag.alarm.dto;

public interface AlarmMasterProjection {
    String getPlantCd();
    String getAlarmId();
    String getBizChainCd();
    String getAlarmType();
    String getAlarmMsgId();
    String getAlarmMsgContents();
    String getAlarmBlink();
    String getAlarmAutoClose();
    String getAlarmAutoPop();
    String getAlarmVoice();
    Integer getAlarmInvokeInterval();
    String getAlarmToUser();
    String getAlarmToRole();
    String getAlarmActionType();
    String getPageLinkId();
    String getConfMsgId();
    String getConfMsgType();
    String getConfMsgContents();
    String getConfMsgParam1();
    String getConfMsgParam2();
    String getConfMsgParam3();
    String getConfNow();
    String getAlarmDetectInterval();
    String getDispAlarmTm();
    String getAlarmUseYn();
    String getAlarmUsage();
    String getAlarmRemarks();
    String getAlarmSmsFl();
    String getAlarmKakaoFl();
    String getAlarmEmailFl();
    String getAlarmToUser2();
    String getAlarmSmsFl2();
    String getAlarmEmailFl2();
    String getAlarmSmsTimeFl();
    String getAlarmKakaoTimeFl();
    String getAlarmKakaoTimeCl();
    String getEmailTitle();
}

