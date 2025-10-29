package com.lsmnm.Tag.alarm.repository;

import com.lsmnm.Tag.alarm.dto.AlarmGroupResponseDto;
import com.lsmnm.Tag.alarm.dto.AlarmMasterProjection;
import com.lsmnm.Tag.alarm.dto.AlarmUserResponseDto;
import com.lsmnm.Tag.alarm.entity.AlarmMaster;
import com.lsmnm.Tag.alarm.entity.AlarmMasterId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlarmMasterRepository extends JpaRepository<AlarmMaster, AlarmMasterId> {

    // master search
    @Query(value = """
             SELECT plant_cd as plantCd
                  , alarm_id as alarmId
                  , biz_chain_cd as bizChainCd
                  , alarm_type as alarmType
                  , alarm_msg_id as alarmMsgId
                  , alarm_msg_contents as alarmMsgContents
                  , CASE WHEN alarm_blink = 'Y' THEN 'true' ELSE 'false' END as alarmBlink
                  , CASE WHEN alarm_auto_close = 'Y' THEN 'true' ELSE 'false' END as alarmAutoClose
                  , CASE WHEN alarm_auto_pop = 'Y' THEN 'true' ELSE 'false' END as alarmAutoPop
                  , CASE WHEN alarm_voice = 'Y' THEN 'true' ELSE 'false' END as alarmVoice
                  , alarm_invoke_interval as alarmInvokeInterval
                  , alarm_to_user as alarmToUser
                  , alarm_to_role as alarmToRole
                  , alarm_action_type as alarmActionType
                  , page_link_id as pageLinkId
                  , conf_msg_id as confMsgId
                  , conf_msg_type as confMsgType
                  , conf_msg_contents as confMsgContents
                  , conf_msg_param1 as confMsgParam1
                  , conf_msg_param2 as confMsgParam2
                  , conf_msg_param3 as confMsgParam3
                  , CASE WHEN conf_now = 'Y' THEN 'true' ELSE 'false' END as confNow
                  , alarm_detect_interval as alarmDetectInterval
                  , CASE WHEN disp_alarm_tm = 'Y' THEN 'true' ELSE 'false' END as dispAlarmTm
                  , CASE WHEN alarm_use_yn = 'Y' THEN 'true' ELSE 'false' END as alarmUseYn
                  , alarm_usage as alarmUsage
                  , alarm_remarks as alarmRemarks
                  , alarm_sms_fl as alarmSmsFl
                  , alarm_kakao_fl as alarmKakaoFl
                  , alarm_email_fl as alarmEmailFl
                  , alarm_to_user2 as alarmToUser2
                  , alarm_sms_fl2 as alarmSmsFl2
                  , alarm_email_fl2 as alarmEmailFl2
                  , alarm_sms_time_fl as alarmSmsTimeFl
                  , alarm_kakao_time_fl as alarmKakaoTimeFl
                  , alarm_kakao_time_cl as alarmKakaoTimeCl
                  , email_title as emailTitle
             FROM scom.sco_alarm_master
            WHERE PLANT_CD     = :plantCd
              AND (:bizChainCd IS NULL OR :bizChainCd = '' OR BIZ_CHAIN_CD = :bizChainCd)
              AND (:alarmType IS NULL OR :alarmType = '' OR ALARM_TYPE = :alarmType)
              AND (:alarmId IS NULL OR :alarmId = '' OR ALARM_ID = :alarmId)
              AND (:alarmMsgId IS NULL OR :alarmMsgId = '' OR ALARM_MSG_ID = :alarmMsgId)
              AND (:alarmMsgContents IS NULL OR :alarmMsgContents = '' OR ALARM_MSG_CONTENTS LIKE '%' || :alarmMsgContents || '%')
            ORDER BY ALARM_ID""", nativeQuery = true)
    List<AlarmMasterProjection> searchAlarmMasters(
            @Param("plantCd") String plantCd,
            @Param("bizChainCd") String bizChainCd,
            @Param("alarmType") String alarmType,
            @Param("alarmId") String alarmId,
            @Param("alarmMsgId") String alarmMsgId,
            @Param("alarmMsgContents") String alarmMsgContents);

    // user
    @Query(value = """
                SELECT * FROM (
                    SELECT cd_val as ROLE_CD, cd_nm as ROLE_NM, null as role_nm2
                    FROM scom.vw_code_master
                    WHERE master_cd = 'DEPT_CD'
                      AND :ALARM_USER_TYPE = 'R'
                      AND cd_val LIKE :ALARM_USER_ID || '%'
                      AND cd_nm LIKE :ALARM_USER_NM || '%'
                      AND cd_val NOT IN (SELECT unnest(string_to_array(:ALARM_TO_ROLE, ',', null)))
                    UNION ALL
                    SELECT a.USER_ID, a.USER_NM, '' as role_nm2
                    FROM scom.sco_user a
                    WHERE :ALARM_USER_TYPE = 'U'
                      AND a.USER_ID LIKE :ALARM_USER_ID || '%'
                      AND a.USER_NM LIKE :ALARM_USER_NM || '%'
                      AND a.USER_ID NOT IN (SELECT unnest(string_to_array(:ALARM_TO_USER, ',', null)))
                      AND a.USER_ID NOT IN (SELECT unnest(string_to_array(:ALARM_TO_USER2, ',', null)))
                ) AS alarm_user
                ORDER BY ROLE_CD
            """, nativeQuery = true)
    List<AlarmUserResponseDto> findAlarmUser(
            @Param("ALARM_USER_TYPE") String alarmUserType,
            @Param("ALARM_USER_ID") String alarmUserId,
            @Param("ALARM_USER_NM") String alarmUserNm,
            @Param("ALARM_TO_ROLE") String alarmToRole,
            @Param("ALARM_TO_USER") String alarmToUser,
            @Param("ALARM_TO_USER2") String alarmToUser2);

    // Group
    @Query(value = """
               SELECT B.ALARM_GRP_ID, MAX(A.ALARM_GRP_NM) AS ALARM_GRP_NM
                                	  FROM scom.sco_alarm_group_master A
                                	     , scom.sco_alarm_group_detail B
                                	 WHERE A.PLANT_CD    	= B.PLANT_CD
                                	   AND A.ALARM_GRP_ID   = B.ALARM_GRP_ID
                                	   AND A.ALARM_GRP_TYPE = B.ALARM_GRP_TYPE
                                	   AND A.ALARM_GRP_TYPE = :ALARM_GRP_TYPE
                                	 GROUP BY B.ALARM_GRP_ID
                                	 ORDER BY B.ALARM_GRP_ID
            """, nativeQuery = true)
    List<AlarmGroupResponseDto> findAlarmGroup(@Param("ALARM_GRP_TYPE") String alarmGrpType);

    // Delete
    Optional<AlarmMaster> findById_PlantCdAndId_AlarmId(String plantCd, String alarmId);
}



