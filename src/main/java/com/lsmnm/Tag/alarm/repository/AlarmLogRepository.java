package com.lsmnm.Tag.alarm.repository;

import com.lsmnm.Tag.alarm.dto.AlarmUserLogResponseDto;
import com.lsmnm.Tag.alarm.entity.AlarmLog;
import com.lsmnm.Tag.alarm.entity.AlarmLogId;
import com.lsmnm.Tag.alarm.dto.AlarmLogSearchResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlarmLogRepository extends JpaRepository<AlarmLog, AlarmLogId> {

    /**
     * 알람 로그 검색
     */
    @Query(value = """
        SELECT plant_cd as plantCd
             , biz_chain_cd as bizChainCd
             , MIN(alarm_log_id) as alarmLogId
             , alarm_id as alarmId
             , alarm_type as alarmType
             , alarm_msg_id as alarmMsgId
             , alarm_dtm as alarmDtm
             , conf_yn as confYn
             , conf_dtm as confDtm
             , alarm_msg_contents as alarmMsgContents
             , replace(alarm_msg_attrs,'%%%%','') as alarmMsgAttrs
             , email_send_yn as emailSendYn
             , sms_send_yn as smsSendYn
             , kakao_send_yn as kakaoSendYn
        FROM(
            SELECT
                   a.plant_cd
                 , c.biz_chain_cd
                 , alarm_log_id
                 , a.alarm_id
                 , a.alarm_type
                 , a.alarm_msg_id
                 , TO_CHAR(alarm_dtm, 'YYYY-MM-DD HH24:MI:SS') as alarm_dtm
                 , conf_yn
                 , COALESCE(TO_CHAR(conf_dtm, 'YYYY-MM-DD HH24:MI:SS'), '') as conf_dtm
                 , replace(replace(replace(replace(b.message, '{1}', COALESCE(a.alarm_msg_param1, '')), '{2}', COALESCE(a.alarm_msg_param2, '')), '{3}', COALESCE(a.alarm_msg_param3, '')), '{4}', COALESCE(a.alarm_msg_param4, '')) as alarm_msg_contents
                 , COALESCE(a.mgmt_attr1, '')||'%'||COALESCE(a.mgmt_attr2, '')||'%'||COALESCE(a.mgmt_attr3, '')||'%'||COALESCE(a.mgmt_attr4, '')||'%'||COALESCE(a.mgmt_attr5, '') as alarm_msg_attrs
                 , (case when a.email_send_yn = 'Y' then '●' else '' end) as email_send_yn
                 , (case when a.sms_send_yn = 'Y' then '●' else '' end) as sms_send_yn
                 , (case when a.kakao_send_yn = 'Y' then '●' else '' end) as kakao_send_yn
              FROM scom.SCO_ALARM_LOG a
                 , scom.sco_msg_master b
                 , scom.sco_alarm_master c
             WHERE a.PLANT_CD     = :plantCd
               AND (:alarmType IS NULL OR :alarmType = '' OR a.ALARM_TYPE = :alarmType)
               AND (:alarmLogId IS NULL OR :alarmLogId = '' OR ALARM_LOG_ID like :alarmLogId || '%')
               AND (:alarmId IS NULL OR :alarmId = '' OR a.ALARM_ID = :alarmId)
               AND (:alarmMsgId IS NULL OR :alarmMsgId = '' OR a.ALARM_MSG_ID = :alarmMsgId)
               and alarm_dtm between TO_TIMESTAMP(:alarmDtmSta, 'YYYY-MM-DD HH24:MI:SS') and TO_TIMESTAMP(:alarmDtmEnd, 'YYYY-MM-DD HH24:MI:SS')
               and COALESCE(CONF_YN,'N') = COALESCE(:confYn, CONF_YN, 'N')
               and a.ALARM_MSG_ID = b.msg_id
               and a.alarm_id = c.alarm_id
               and (:bizChainCd IS NULL OR :bizChainCd = '' OR c.biz_chain_cd like '%' || :bizChainCd || '%')
               and (COALESCE(a.email_send_yn,'N') = ANY(case when 'E' = :alarmSendType then ARRAY['Y'] else ARRAY['Y','N'] end)
                and COALESCE(a.sms_send_yn,'N') = ANY(case when 'S' = :alarmSendType then ARRAY['Y'] else ARRAY['Y','N'] end)
                and COALESCE(a.kakao_send_yn,'N') = ANY(case when 'K' = :alarmSendType then ARRAY['Y'] else ARRAY['Y','N'] end))
        ) subquery
        WHERE (:alarmMsgContents IS NULL OR :alarmMsgContents = '' OR subquery.alarm_msg_contents like '%' || :alarmMsgContents || '%')
          and (:alarmMsgAttrs IS NULL OR :alarmMsgAttrs = '' OR subquery.alarm_msg_attrs like '%' || :alarmMsgAttrs || '%')
        group by subquery.plant_cd, subquery.biz_chain_cd, subquery.alarm_id, subquery.alarm_type, subquery.alarm_msg_id, subquery.alarm_dtm, subquery.conf_yn, subquery.conf_dtm, subquery.alarm_msg_contents, subquery.alarm_msg_attrs, subquery.email_send_yn, subquery.sms_send_yn, subquery.kakao_send_yn
        ORDER BY subquery.alarm_dtm desc
        """, nativeQuery = true)
    List<AlarmLogSearchResponseDto> searchAlarmLogs(
            @Param("plantCd") String plantCd,
            @Param("alarmType") String alarmType,
            @Param("alarmLogId") String alarmLogId,
            @Param("alarmId") String alarmId,
            @Param("alarmMsgId") String alarmMsgId,
            @Param("alarmDtmSta") String alarmDtmSta,
            @Param("alarmDtmEnd") String alarmDtmEnd,
            @Param("confYn") String confYn,
            @Param("bizChainCd") String bizChainCd,
            @Param("alarmSendType") String alarmSendType,
            @Param("alarmMsgContents") String alarmMsgContents,
            @Param("alarmMsgAttrs") String alarmMsgAttrs);

    /**
     * 알람 로그 사용자 검색
     */
    @Query(value = """
            SELECT a.recv_addr as recvAddr,
                   b.user_nm as alarmToUser
            FROM scom.sco_alarm_log a,
                 scom.sco_user b
            WHERE a.alarm_id = :alarmId
            AND a.alarm_dtm = TO_CHAR(TO_DATE(:alarmDtm, 'YYYY-MM-DD HH24:MI:SS'),'YYYYMMDDHH24MISS')
            AND a.recv_addr = b.user_id
            """, nativeQuery = true)
    List<AlarmUserLogResponseDto> findAlarmLogUserByAlarmIdAndDtm(
            @Param("alarmId") String alarmId,
            @Param("alarmDtm") String alarmDtm);
}