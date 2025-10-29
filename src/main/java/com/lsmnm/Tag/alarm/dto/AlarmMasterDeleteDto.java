package com.lsmnm.Tag.alarm.dto;

import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AlarmMasterDeleteDto {

    @Column(name = "공장 코드")
    private String plantCd;
    @Column(name = "알람 ID")
    private String alarmId;
}
