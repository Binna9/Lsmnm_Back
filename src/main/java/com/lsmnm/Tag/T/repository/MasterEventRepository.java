package com.lsmnm.Tag.T.repository;

import com.lsmnm.Tag.T.entity.MasterEvent;
import com.lsmnm.Tag.T.entity.MasterEventId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MasterEventRepository extends JpaRepository<MasterEvent, MasterEventId> {

    Optional<MasterEvent> findByIdTagIdAndIdEventSeq(String tagId, String eventSeq);

    @Query("SELECT me FROM MasterEvent me WHERE " +
           "(:tagId IS NULL OR :tagId = '' OR me.id.tagId LIKE CONCAT('%', :tagId, '%')) AND " +
           "(:eventSeq IS NULL OR :eventSeq = '' OR me.id.eventSeq LIKE CONCAT('%', :eventSeq, '%')) AND " +
           "(:eventDesc IS NULL OR :eventDesc = '' OR me.eventDesc LIKE CONCAT('%', :eventDesc, '%')) AND " +
           "(:eventTy IS NULL OR :eventTy = '' OR me.eventTy = :eventTy) AND " +
           "(:eventEndYn IS NULL OR :eventEndYn = '' OR me.eventEndYn = :eventEndYn) AND " +
           "(:alarmId IS NULL OR :alarmId = '' OR me.alarmId = :alarmId)")
    List<MasterEvent> searchMasterEvents(
            @Param("tagId") String tagId,
            @Param("eventSeq") String eventSeq,
            @Param("eventDesc") String eventDesc,
            @Param("eventTy") String eventTy,
            @Param("eventEndYn") String eventEndYn,
            @Param("alarmId") String alarmId
    );

    void deleteByIdTagId(String tagId);

    List<MasterEvent> findByIdTagId(String tagId);
}
