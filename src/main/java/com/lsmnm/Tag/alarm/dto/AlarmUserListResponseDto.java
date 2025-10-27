package com.lsmnm.Tag.alarm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmUserListResponseDto {

    @JsonProperty("displaymsg")
    private String displaymsg;

    @JsonProperty("is_success")
    private Boolean isSuccess;

    @JsonProperty("statusMsg")
    private String statusMsg;

    @JsonProperty("RK_ALARM_USER")
    private List<List<AlarmUserResponseDto>> rkAlarmUser;
}
