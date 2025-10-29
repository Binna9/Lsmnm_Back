package com.lsmnm.Tag.T.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class MasterEventDeleteDto {

    @Column(name = "TAG_ID")
    private String tagId;
    @Column(name = "순번")
    private String eventRecvTy;
}
