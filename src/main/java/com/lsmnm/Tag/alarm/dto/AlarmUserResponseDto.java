package com.lsmnm.Tag.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmUserResponseDto {

    private String roleCd;
    private String roleNm;
    private String roleNm2;
}
