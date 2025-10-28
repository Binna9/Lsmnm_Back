package com.lsmnm.Tag.alarm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AlarmLogListResponseDto {

    @JsonProperty("displaymsg")
    private String displaymsg;
    @JsonProperty("is_success")
    private Boolean isSuccess;
    @JsonProperty("statusMsg")
    private String statusMsg;
    @JsonProperty("RK_ALARM_LOG")
    private List<AlarmLogSearchResponseDto> rkAlarmLog;
}

