package com.lsmnm.Tag.alarm.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmUserLogResponseDto {
    
    private String recvAddr;
    private String alarmToUser;
}



