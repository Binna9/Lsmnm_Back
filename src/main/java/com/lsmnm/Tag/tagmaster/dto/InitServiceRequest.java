package com.lsmnm.Tag.tagmaster.dto;

import lombok.Data;

@Data
public class InitServiceRequest {
    private String userId;
    private String pgmId;
    private String mnuId;
    private String langCd;
    private String lineCd;
    private String clientIp;
    private String plantCd;
    private String searchScreenAuthority;
}
