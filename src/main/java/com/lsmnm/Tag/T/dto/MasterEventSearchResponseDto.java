package com.lsmnm.Tag.T.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MasterEventSearchResponseDto {

    @JsonProperty("TAG_ID")
    private String tagId;
    @JsonProperty("TAG_NM")
    private String tagNm;
    @JsonProperty("EVENT_SEQ")
    private Integer eventSeq;
    @JsonProperty("EVENT_DESC")
    private String eventDesc;
    @JsonProperty("EVENT_TY")
    private String eventTy;
    @JsonProperty("EVENT_END_YN")
    private String eventEndYn;
    @JsonProperty("ALARM_ID")
    private String alarmId;
    @JsonProperty("LINK_PGM")
    private String linkPgm;
    @JsonProperty("COND_STD")
    private String condStd;
    @JsonProperty("UCL_VAL")
    private BigDecimal uclVal;
    @JsonProperty("LCL_VAL")
    private BigDecimal lclVal;
    @JsonProperty("STD_VAL")
    private BigDecimal stdVal;
    @JsonProperty("MAINT_TIME")
    private BigDecimal maintTime;
    @Builder.Default
    @JsonProperty("JQX_CB")
    private Boolean jqxCb = false;

    public MasterEventSearchResponseDto(String tagId ,String tagNm ,Integer eventSeq ,String eventDesc, String eventTy ,String eventEndYn, String alarmId ,String linkPgm,
                                        String condStd ,BigDecimal uclVal , BigDecimal lclVal , BigDecimal stdVal , BigDecimal maintTime) {
        this.tagId = tagId;
        this.tagNm = tagNm;
        this.eventSeq = eventSeq;
        this.eventDesc = eventDesc;
        this.eventTy = eventTy;
        this.eventEndYn = eventEndYn;
        this.alarmId = alarmId;
        this.linkPgm = linkPgm;
        this.condStd = condStd;
        this.uclVal = uclVal;
        this.lclVal = lclVal;
        this.stdVal = stdVal;
        this.maintTime = maintTime;
        jqxCb = false;
    }
}
