package com.lsmnm.Tag.T.repository;

import com.lsmnm.Tag.T.dto.MasterEventProjection;
import com.lsmnm.Tag.T.entity.MasterEvent;
import com.lsmnm.Tag.T.entity.MasterEventId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface MasterEventRepository extends JpaRepository<MasterEvent, MasterEventId> {

    // SELECT
    @Query(value = """
            SELECT
                 t1.tag_id,
                 t2.tag_nm,
                 t1.event_seq,
                 t1.event_desc,
                 t1.event_ty,
                 t1.event_end_yn,
                 t1.alarm_id,
                 t1.link_pgm,
                 t1.cond_std,
                 t1.ucl_val,
                 t1.lcl_val,
                 t1.std_val,
                 t1.maint_time
             FROM srtp.t_mz_tag_master_event t1
             JOIN srtp.t_mz_tag_master t2
               ON t1.tag_id = t2.tag_id
             WHERE t1.tag_id LIKE '%' || COALESCE(:TAG_ID, '') || '%'
               AND t1.event_ty LIKE '%' || COALESCE(:EVENT_RECV_TY, '') || '%'
             ORDER BY t1.tag_id, t1.event_seq
            """, nativeQuery = true)
    List<MasterEventProjection> getMasterEvents(
            @Param("TAG_ID") String tagId,
            @Param("EVENT_RECV_TY") String eventRecvTy
    );

    // SAVE
    @Procedure(name = "p_save")
    void callSave(
            @Param("p_tag_id") String tagId,
            @Param("p_event_seq") BigDecimal eventSeq,
            @Param("p_event_desc") String eventDesc,
            @Param("p_event_ty") String eventTy,
            @Param("p_event_end_yn") String eventEndYn,
            @Param("p_alarm_id") String alarmId,
            @Param("p_link_pgm") String linkPgm,
            @Param("p_cond_std") String condStd,
            @Param("p_ucl_val") BigDecimal uclVal,
            @Param("p_lcl_val") BigDecimal lclVal,
            @Param("p_std_val") BigDecimal stdVal,
            @Param("p_maint_time") BigDecimal maintTime
    );

    // DELETE
    Optional<MasterEvent> findByIdTagIdAndIdEventSeq(String tagId, String eventSeq);
}
