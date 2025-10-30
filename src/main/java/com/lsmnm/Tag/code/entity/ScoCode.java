package com.lsmnm.Tag.code.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "sco_code_detail", schema = "scom")
public class ScoCode {

    @EmbeddedId
    private ScoCodeId id;
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
    @Column(name = "cd_nm")
    private String cdNm;
    @Column(name = "cd_desc")
    private String cdDesc;
    @Column(name = "tags")
    private String tags;
    @Column(name = "use_yn")
    private String useYn;
    @Column(name = "attr1")
    private String attr1;
    @Column(name = "attr2")
    private String attr2;
    @Column(name = "attr3")
    private String attr3;
    @Column(name = "remarks", length = 500)
    private String remarks;
    @Column(name = "erp_cd", length = 50)
    private String erpCd;
    @Column(name = "attr4", length = 50)
    private String attr4;
    @Column(name = "attr5", length = 50)
    private String attr5;
    @Column(name = "attr6", length = 50)
    private String attr6;
    @Column(name = "attr7", length = 50)
    private String attr7;
    @Column(name = "attr8", length = 50)
    private String attr8;
    @Column(name = "attr9", length = 50)
    private String attr9;
    @Column(name = "attr10", length = 50)
    private String attr10;
    @Column(name = "attr11", length = 50)
    private String attr11;
    @Column(name = "attr12", length = 50)
    private String attr12;
    @Column(name = "attr13", length = 50)
    private String attr13;
    @Column(name = "attr14", length = 50)
    private String attr14;
    @Column(name = "attr15", length = 50)
    private String attr15;
    @Column(name = "attr16", length = 50)
    private String attr16;
    @Column(name = "attr17", length = 50)
    private String attr17;
    @Column(name = "attr18", length = 50)
    private String attr18;
    @Column(name = "attr19", length = 50)
    private String attr19;
    @Column(name = "attr20", length = 50)
    private String attr20;
    @Column(name = "disp_seq", precision = 5)
    private BigDecimal dispSeq;
}
