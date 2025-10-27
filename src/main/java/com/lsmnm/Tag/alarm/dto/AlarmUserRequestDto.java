package com.lsmnm.Tag.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmUserRequestDto {

    private String alarmUserType;
    private String alarmUserId;
    private String alarmUserNm;
    private String alarmToRole;
    private String alarmToUser;
    private String alarmToUser2;
}

