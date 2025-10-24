package com.lsmnm.Tag.alarm.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmLogDto {

    // 복합키 정보
    private String plantCd;
    private String alarmLogId;

    // 기본 정보
    private String crtUserId;
    private String crtObjId;
    private LocalDateTime crtTm;
    private String updUserId;
    private String updObjId;
    private LocalDateTime updTm;
    private String archiveFl;

    // 알람 정보
    private String alarmId;
    private String alarmType;
    private String alarmMsgId;
    private String alarmMsgContents;
    private String alarmDtm;

    // 확인 정보
    private String confYn;
    private String confDtm;

    // 알람 메시지 파라미터
    private String alarmMsgParam1;
    private String alarmMsgParam2;
    private String alarmMsgParam3;
    private String alarmMsgParam4;

    // 확인 메시지 파라미터
    private String confMsgParam1;
    private String confMsgParam2;
    private String confMsgParam3;
    private String confMsgParam4;

    // SMS 정보
    private String smsSendYn;
    private String smsSendDtm;

    // 입력값
    private String inputVal;

    // 이메일 정보
    private String emailSendYn;
    private String emailSendDtm;
    private String emailTitle;
    private String recvAddr;

    // 카카오톡 정보
    private String kakaoSendYn;
    private String kakaoSendDtm;

    // 관리 속성
    private String mgmtAttr1;
    private String mgmtAttr2;
    private String mgmtAttr3;
    private String mgmtAttr4;
    private String mgmtAttr5;
}



