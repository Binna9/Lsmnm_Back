package com.lsmnm.Tag.alarm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmMasterListResponseDto {
    
    @JsonProperty("displaymsg")
    private String displaymsg;
    
    @JsonProperty("is_success")
    private Boolean isSuccess;
    
    @JsonProperty("statusMsg")
    private String statusMsg;
    
    @JsonProperty("RK_ALARM")
    private List<AlarmMasterSearchResponseDto> RK_ALARM;
}

