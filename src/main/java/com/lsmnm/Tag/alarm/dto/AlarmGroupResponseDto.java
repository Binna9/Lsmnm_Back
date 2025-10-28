package com.lsmnm.Tag.alarm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AlarmGroupResponseDto {

    @JsonProperty("ALARM_GRP_ID")
    private String alarmGrpId;
    @JsonProperty("ALARM_GRP_NM")
    private String alarmGrpNm;
    @JsonProperty("JQX_CB")
    private Boolean jqxCb;
}
