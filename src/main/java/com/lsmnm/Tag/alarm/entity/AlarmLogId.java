package com.lsmnm.Tag.alarm.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.io.Serializable;
import java.util.Objects;
import lombok.*;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmLogId implements Serializable {

    @Column(name = "plant_cd")
    private String plantCd;

    @Column(name = "alarm_log_id")
    private String alarmLogId;
}

