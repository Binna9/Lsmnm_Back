package com.lsmnm.Tag.T.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "t_mz_tag_master_event", schema = "srtp")
public class MasterEvent {

    @EmbeddedId
    private MasterEventId id;
    @Column(name = "crt_user_id")
    private String crtUserId;
    @Column(name = "crt_obj_id")
    private String crtObjId;
    @Column(name = "crt_tm")
    private String crtTm;
    @Column(name = "upd_user_id")
    private String updUserId;
    @Column(name = "upd_obj_id")
    private String updObjId;
    @Column(name = "upd_tm")
    private String updTm;
    @Column(name = "archive_fl")
    private String archiveFl;
    @Column(name = "event_desc")
    private String eventDesc;
    @Column(name = "event_ty")
    private String eventTy;
    @Column(name = "event_end_yn")
    private String eventEndYn;
    @Column(name = "alarm_id")
    private String alarmId;
    @Column(name = "link_pgm")
    private String linkPgm;
    @Column(name = "cond_std")
    private String condStd;
    @Column(name = "ucl_var")
    private String uclVar;
    @Column(name = "lcl_var")
    private String lclVar;
    @Column(name = "std_val")
    private String stdVar;
    @Column(name = "maint_time")
    private String maintTime;
}
