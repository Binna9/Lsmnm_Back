package com.lsmnm.Tag.alarm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmUserGroupListResponseDto {

    @JsonProperty("displaymsg")
    private String displaymsg;
    @JsonProperty("is_success")
    private Boolean isSuccess;
    @JsonProperty("statusMsg")
    private String statusMsg;
    @JsonProperty("RK_ALARM_USER")
    private List<List<AlarmUserResponseDto>> rkAlarmUser;
    @JsonProperty("RK_ALARM_GROUP")
    private List<List<AlarmGroupResponseDto>> rkAlarmGroup;
}
