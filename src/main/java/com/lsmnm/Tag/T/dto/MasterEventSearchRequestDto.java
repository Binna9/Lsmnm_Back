package com.lsmnm.Tag.T.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class MasterEventSearchRequestDto {

    private String tagId;
    private String eventRecvTy;
}
