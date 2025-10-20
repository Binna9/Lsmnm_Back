package com.lsmnm.Tag.tagmaster.dto;

import lombok.Data;

@Data
public class SearchServiceRequest {
    private String userId;
    private String pgmId;
    private String langCd;
    private String clientIp;
    private String plantCd;
    private String searchTy;
    private String facCd;
    private String procCd;
    private String assetCd;
    private String monTreeCd;
    private String monScrCd;
    private String tagId;
    private String tagNm;
    private String linkTagHist;
    private String linkBizScr;
    private String linkBizTag;
    private String linkTagMacro;
    private String linkTagEvent;
}
