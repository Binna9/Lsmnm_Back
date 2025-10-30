package com.lsmnm.Tag.code.entity;

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
public class ScoCodeId implements Serializable {

    @Column(name = "plant_cd")
    private String plantCd;
    @Column(name = "master_cd")
    private String masterCd;
    @Column(name = "cd_val")
    private String cdVal;
}

