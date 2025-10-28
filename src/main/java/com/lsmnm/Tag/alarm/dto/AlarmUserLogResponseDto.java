package com.lsmnm.Tag.alarm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmUserLogResponseDto {

    @JsonProperty("RECV_ADDR")
    private String recvAddr;
    @JsonProperty("ALARM_TO_USER")
    private String alarmToUser;
    @Builder.Default
    @JsonProperty("JQX_CB")
    private Boolean jqxCb = false;

    public AlarmUserLogResponseDto (String recvAddr, String alarmToUser) {
            this.recvAddr = recvAddr;
            this.alarmToUser = alarmToUser;
            jqxCb = false;
    }
}



