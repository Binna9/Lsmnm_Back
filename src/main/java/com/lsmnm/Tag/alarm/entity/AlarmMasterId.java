package com.lsmnm.Tag.alarm.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class AlarmMasterId implements Serializable {

    @Column(name = "plant_cd")
    private String plantCd;
    @Column(name = "alarm_id")
    private String alarmId;
}
