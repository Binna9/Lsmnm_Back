package com.lsmnm.Tag.alarm.repository;

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

    // 공장코드로 조회
    List<AlarmLog> findByIdPlantCd(String plantCd);

    // 알람 타입으로 조회
    List<AlarmLog> findByAlarmType(String alarmType);

    // 확인 여부로 조회
    List<AlarmLog> findByConfYn(String confYn);

    // 특정 기간의 알람 로그 조회
    @Query("SELECT a FROM AlarmLog a WHERE a.crtTm BETWEEN :startDate AND :endDate ORDER BY a.crtTm DESC")
    List<AlarmLog> findByCrtTmBetween(@Param("startDate") LocalDateTime startDate, 
                                     @Param("endDate") LocalDateTime endDate);

    // 공장코드와 알람타입으로 조회
    List<AlarmLog> findByIdPlantCdAndAlarmType(String plantCd, String alarmType);

    // 미확인 알람 조회
    @Query("SELECT a FROM AlarmLog a WHERE a.confYn = 'N' OR a.confYn IS NULL ORDER BY a.crtTm DESC")
    List<AlarmLog> findUnconfirmedAlarms();

    // 최근 알람 로그 조회 (페이징)
    @Query("SELECT a FROM AlarmLog a ORDER BY a.crtTm DESC")
    List<AlarmLog> findRecentAlarms();
}
