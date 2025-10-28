package com.lsmnm.Tag.alarm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AlarmUserResponseDto {

    @JsonProperty("ROLE_CD")
    private String roleCd;
    @JsonProperty("ROLE_NM")
    private String roleNm;
    @JsonProperty("ROLE_NM2")
    private String roleNm2;
    @JsonProperty("JQX_CB")
    private Boolean jqxCb;
}
