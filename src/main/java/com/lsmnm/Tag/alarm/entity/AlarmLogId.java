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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AlarmLogId)) return false;
        AlarmLogId that = (AlarmLogId) o;
        return Objects.equals(plantCd, that.plantCd) &&
                Objects.equals(alarmLogId, that.alarmLogId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(plantCd, alarmLogId);
    }
}

