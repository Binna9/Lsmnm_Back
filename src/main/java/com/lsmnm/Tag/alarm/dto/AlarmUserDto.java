package com.lsmnm.Tag.alarm.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmUserDto {
    
    private String recvAddr;
    private String alarmToUser;
}



