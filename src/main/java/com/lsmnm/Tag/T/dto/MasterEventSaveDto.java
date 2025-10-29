package com.lsmnm.Tag.T.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class MasterEventSaveDto {

        private String tagId;
        private BigDecimal eventSeq;
        private String eventDesc;
        private String eventTy;
        private String eventEndYn;
        private String alarmId;
        private String linkPgm;
        private String condStd;
        private BigDecimal uclVal;
        private BigDecimal lclVal;
        private BigDecimal stdVal;
        private BigDecimal maintTime;
}
