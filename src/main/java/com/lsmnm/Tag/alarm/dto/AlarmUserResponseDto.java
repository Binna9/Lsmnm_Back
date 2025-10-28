package com.lsmnm.Tag.alarm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmUserResponseDto {

    @JsonProperty("ROLE_CD")
    private String roleCd;
    @JsonProperty("ROLE_NM")
    private String roleNm;
    @JsonProperty("ROLE_NM2")
    private String roleNm2;
    @Builder.Default
    @JsonProperty("JQX_CB")
    private Boolean jqxCb = false;

    public AlarmUserResponseDto(String roleCd, String roleNm, String roleNm2) {
        this.roleCd = roleCd;
        this.roleNm = roleNm;
        this.roleNm2 = roleNm2;
        jqxCb = false;
    }
}
