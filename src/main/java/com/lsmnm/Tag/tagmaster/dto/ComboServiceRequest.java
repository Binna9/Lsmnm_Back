package com.lsmnm.Tag.tagmaster.dto;

import lombok.Data;

@Data
public class ComboServiceRequest {
    private String code;
    private String userId;
    private String pgmId;
    private String langCd;
    private String clientIp;
    private String plantCd;
}
