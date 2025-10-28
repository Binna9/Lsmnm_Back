package com.lsmnm.Tag.alarm.repository;

import com.lsmnm.Tag.alarm.dto.AlarmLogProjection;
import com.lsmnm.Tag.alarm.dto.AlarmUserLogResponseDto;
import com.lsmnm.Tag.alarm.entity.AlarmLog;
import com.lsmnm.Tag.alarm.entity.AlarmLogId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AlarmLogRepository extends JpaRepository<AlarmLog, AlarmLogId> {

    /**
     * 알람 로그 검색
     */
    @Query(value = """
            SELECT    plant_cd
                    , biz_chain_cd
                    , MIN(alarm_log_id) AS alarm_log_id
                    , alarm_id
                    , alarm_type
                    , alarm_msg_id
                    , alarm_dtm
                    , conf_yn
                    , conf_dtm
                    , alarm_msg_contents
                    , replace(alarm_msg_attrs,'%%%%','') AS alarm_msg_attrs
                    , email_send_yn
                    , sms_send_yn
                    , kakao_send_yn
            FROM (
                   SELECT a.plant_cd
                        , c.biz_chain_cd
                        , alarm_log_id
                        , a.alarm_id
                        , a.alarm_type
                        , a.alarm_msg_id
                        , a.alarm_dtm
                        , a.conf_yn
                        , a.conf_dtm
                        , replace(
                              replace(
                                replace(
                                  replace(b.message, '{1}', COALESCE(a.alarm_msg_param1,'')),
                                '{2}', COALESCE(a.alarm_msg_param2,'')),
                              '{3}', COALESCE(a.alarm_msg_param3,'')),
                            '{4}', COALESCE(a.alarm_msg_param4,'')) AS alarm_msg_contents
                        , COALESCE(a.mgmt_attr1,'') || '%' ||
                          COALESCE(a.mgmt_attr2,'') || '%' ||
                          COALESCE(a.mgmt_attr3,'') || '%' ||
                          COALESCE(a.mgmt_attr4,'') || '%' ||
                          COALESCE(a.mgmt_attr5,'') AS alarm_msg_attrs
                        , CASE WHEN a.email_send_yn = 'Y' THEN '●' ELSE '' END AS email_send_yn
                        , CASE WHEN a.sms_send_yn   = 'Y' THEN '●' ELSE '' END AS sms_send_yn
                        , CASE WHEN a.kakao_send_yn = 'Y' THEN '●' ELSE '' END AS kakao_send_yn
                   FROM scom.sco_alarm_log a
                   JOIN scom.sco_msg_master b ON a.alarm_msg_id = b.msg_id
                   JOIN scom.sco_alarm_master c ON a.alarm_id = c.alarm_id
                   WHERE a.plant_cd = :plantCd
                     AND (cast(:alarmId as varchar) IS NULL OR a.alarm_id = :alarmId)
                     AND (cast(:alarmLogId as varchar) IS NULL OR alarm_log_id::varchar LIKE :alarmLogId || '%')
                     AND (cast(:alarmMsgId as varchar) IS NULL OR a.alarm_msg_id = :alarmMsgId)
                     AND (cast(:alarmType as varchar) IS NULL OR a.alarm_type = :alarmType)
                     AND (cast(:alarmDtmSta as varchar) IS NULL OR cast(:alarmDtmEnd as varchar) IS NULL OR a.alarm_dtm BETWEEN :alarmDtmSta AND :alarmDtmEnd)
                     AND (cast(:confYn as varchar) IS NULL OR a.conf_yn = :confYn)
                     AND (cast(:bizChainCd as varchar) IS NULL OR c.biz_chain_cd ILIKE '%' || cast(:bizChainCd as varchar) || '%')
                     AND ( COALESCE(a.email_send_yn,'N') = ANY(CASE WHEN COALESCE(:alarmSendType, '') = 'E' THEN ARRAY['Y']::varchar[] ELSE ARRAY['Y','N']::varchar[] END)
                     AND COALESCE(a.sms_send_yn,'N')   = ANY(CASE WHEN COALESCE(:alarmSendType, '') = 'S' THEN ARRAY['Y']::varchar[] ELSE ARRAY['Y','N']::varchar[] END)
                     AND COALESCE(a.kakao_send_yn,'N') = ANY(CASE WHEN COALESCE(:alarmSendType, '') = 'K' THEN ARRAY['Y']::varchar[] ELSE ARRAY['Y','N']::varchar[] END) )
               ) sub
            WHERE (cast(:alarmMsgContents as varchar) IS NULL OR alarm_msg_contents ILIKE '%' || cast(:alarmMsgContents as varchar) || '%')
                     AND (cast(:alarmMsgAttrs as varchar) IS NULL OR alarm_msg_attrs ILIKE '%' || cast(:alarmMsgAttrs as varchar) || '%')
            GROUP BY plant_cd, biz_chain_cd, alarm_id, alarm_type, alarm_msg_id,
                        alarm_dtm, conf_yn, conf_dtm, alarm_msg_contents,
                        alarm_msg_attrs, email_send_yn, sms_send_yn, kakao_send_yn
            ORDER BY alarm_dtm desc
            """, nativeQuery = true)
    List<AlarmLogProjection> searchAlarmLogs(
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
            WHERE a.alarm_id = :ALARM_ID
            AND a.alarm_dtm = TO_CHAR(TO_DATE(:ALARM_DTM, 'YYYY-MM-DD HH24:MI:SS'),'YYYYMMDDHH24MISS')
            AND a.recv_addr = b.user_id
            """, nativeQuery = true)
    List<AlarmUserLogResponseDto> findAlarmLogUserByAlarmIdAndDtm(
            @Param("ALARM_ID") String alarmId,
            @Param("ALARM_DTM") String alarmDtm);
}