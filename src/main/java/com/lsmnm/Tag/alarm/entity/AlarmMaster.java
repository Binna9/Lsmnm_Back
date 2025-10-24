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
@Table(name = "sco_alarm_master", schema = "scom")
public class AlarmMaster {

    @EmbeddedId
    private AlarmMasterId id;

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

    @Column(name = "biz_chain_cd")
    private String bizChainCd;

    @Column(name = "alarm_type")
    private String alarmType;

    @Column(name = "alarm_msg_id")
    private String alarmMsgId;

    @Column(name = "alarm_msg_contents", columnDefinition = "text")
    private String alarmMsgContents;

    @Column(name = "alarm_blink")
    private String alarmBlink;

    @Column(name = "alarm_auto_close")
    private String alarmAutoClose;

    @Column(name = "alarm_auto_pop")
    private String alarmAutoPop;

    @Column(name = "alarm_invoke_interval")
    private Integer alarmInvokeInterval;

    @Column(name = "alarm_from_user")
    private String alarmFromUser;

    @Column(name = "alarm_from_role")
    private String alarmFromRole;

    @Column(name = "alarm_to_user")
    private String alarmToUser;

    @Column(name = "alarm_to_role")
    private String alarmToRole;

    @Column(name = "alarm_action_type")
    private String alarmActionType;

    @Column(name = "page_link_id")
    private String pageLinkId;

    @Column(name = "conf_msg_id")
    private String confMsgId;

    @Column(name = "conf_msg_type")
    private String confMsgType;

    @Column(name = "conf_msg_contents", columnDefinition = "text")
    private String confMsgContents;

    @Column(name = "conf_msg_param1")
    private String confMsgParam1;

    @Column(name = "conf_msg_param2")
    private String confMsgParam2;

    @Column(name = "conf_msg_param3")
    private String confMsgParam3;

    @Column(name = "conf_now")
    private String confNow;

    @Column(name = "email_send_yn")
    private String emailSendYn;

    @Column(name = "email_id")
    private String emailId;

    @Column(name = "sms_send_yn")
    private String smsSendYn;

    @Column(name = "alarm_to_user_nm")
    private String alarmToUserNm;

    @Column(name = "alarm_to_role_nm")
    private String alarmToRoleNm;

    @Column(name = "alarm_msg_param1")
    private String alarmMsgParam1;

    @Column(name = "alarm_msg_param2")
    private String alarmMsgParam2;

    @Column(name = "alarm_msg_param3")
    private String alarmMsgParam3;

    @Column(name = "alarm_detect_interval")
    private String alarmDetectInterval;

    @Column(name = "disp_alarm_tm")
    private String dispAlarmTm;

    @Column(name = "alarm_use_yn")
    private String alarmUseYn;

    @Column(name = "alarm_usage")
    private String alarmUsage;

    @Column(name = "alarm_remarks")
    private String alarmRemarks;

    @Column(name = "alarm_sms_fl")
    private String alarmSmsFl;

    @Column(name = "alarm_email_fl")
    private String alarmEmailFl;

    @Column(name = "alarm_to_user2")
    private String alarmToUser2;

    @Column(name = "alarm_sms_fl2")
    private String alarmSmsFl2;

    @Column(name = "alarm_email_fl2")
    private String alarmEmailFl2;

    @Column(name = "alarm_to_chk_time")
    private String alarmToChkTime;

    @Column(name = "alarm_sms_time_fl")
    private String alarmSmsTimeFl;

    @Column(name = "alarm_voice")
    private String alarmVoice;

    @Column(name = "email_title")
    private String emailTitle;

    @Column(name = "alarm_kakao_fl")
    private String alarmKakaoFl;

    @Column(name = "alarm_kakao_time_fl")
    private String alarmKakaoTimeFl;

    @Column(name = "alarm_kakao_time_cl")
    private String alarmKakaoTimeCl;

    @Column(name = "kakao_template_no")
    private String kakaoTemplateNo;

    @Column(name = "kakao_template_msg")
    private String kakaoTemplateMsg;
}
