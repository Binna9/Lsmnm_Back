package com.lsmnm.Tag.alarm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AlarmUserLogResponseDto {

    @JsonProperty("RECV_ADDR")
    private String recvAddr;
    @JsonProperty("ALARM_TO_USER")
    private String alarmToUser;
    @JsonProperty("JQX_CB")
    private String jqxCb;
}



