package com.lsmnm.Tag.alarm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "sco_alarm_log")
public class AlarmLog {

    @EmbeddedId
    private AlarmLogId id;

    @Column(name = "crt_user_id")
    private String crtUserId;

    @Column(name = "crt_obj_id")
    private String crtObjId;

    @Column(name = "crt_tm")
    private LocalDateTime crtTm;

    @Column(name = "upd_user_id")
    private String updUserId;

    @Column(name = "upd_obj_id")
    private String updObjId;

    @Column(name = "upd_tm")
    private LocalDateTime updTm;

    @Column(name = "archive_fl")
    private String archiveFl;

    @Column(name = "alarm_id")
    private String alarmId;

    @Column(name = "alarm_type")
    private String alarmType;

    @Column(name = "alarm_msg_id", columnDefinition = "text")
    private String alarmMsgId;

    @Column(name = "alarm_msg_contents", columnDefinition = "text")
    private String alarmMsgContents;

    @Column(name = "alarm_dtm")
    private String alarmDtm;

    @Column(name = "conf_yn")
    private String confYn;

    @Column(name = "conf_dtm")
    private String confDtm;

    @Column(name = "alarm_msg_param1")
    private String alarmMsgParam1;

    @Column(name = "alarm_msg_param2")
    private String alarmMsgParam2;

    @Column(name = "alarm_msg_param3")
    private String alarmMsgParam3;

    @Column(name = "alarm_msg_param4")
    private String alarmMsgParam4;

    @Column(name = "conf_msg_param1")
    private String confMsgParam1;

    @Column(name = "conf_msg_param2")
    private String confMsgParam2;

    @Column(name = "conf_msg_param3")
    private String confMsgParam3;

    @Column(name = "conf_msg_param4")
    private String confMsgParam4;

    @Column(name = "sms_send_yn")
    private String smsSendYn;

    @Column(name = "sms_send_dtm")
    private String smsSendDtm;

    @Column(name = "input_val")
    private String inputVal;

    @Column(name = "email_send_yn")
    private String emailSendYn;

    @Column(name = "email_send_dtm")
    private String emailSendDtm;

    @Column(name = "email_title")
    private String emailTitle;

    @Column(name = "recv_addr")
    private String recvAddr;

    @Column(name = "kakao_send_yn")
    private String kakaoSendYn;

    @Column(name = "kakao_send_dtm")
    private String kakaoSendDtm;

    @Column(name = "mgmt_attr1")
    private String mgmtAttr1;

    @Column(name = "mgmt_attr2")
    private String mgmtAttr2;

    @Column(name = "mgmt_attr3")
    private String mgmtAttr3;

    @Column(name = "mgmt_attr4")
    private String mgmtAttr4;

    @Column(name = "mgmt_attr5")
    private String mgmtAttr5;
}
