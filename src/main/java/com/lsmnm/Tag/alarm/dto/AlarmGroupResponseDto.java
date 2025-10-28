package com.lsmnm.Tag.alarm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmGroupResponseDto {

    @JsonProperty("ALARM_GRP_ID")
    private String alarmGrpId;
    @JsonProperty("ALARM_GRP_NM")
    private String alarmGrpNm;
    @Builder.Default
    @JsonProperty("JQX_CB")
    private Boolean jqxCb = false;

    public AlarmGroupResponseDto(String alarmGrpId, String alarmGrpNm) {
        this.alarmGrpId = alarmGrpId;
        this.alarmGrpNm = alarmGrpNm;
        this.jqxCb = false;
    }
}

