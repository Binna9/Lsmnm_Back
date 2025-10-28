package com.lsmnm.Tag.T.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MasterEventResponseDto {
    
    private String tagId;
    private String eventSeq;
    private String crtUserId;
    private String crtObjId;
    private String crtTm;
    private String updUserId;
    private String updObjId;
    private String updTm;
    private String archiveFl;
    private String eventDesc;
    private String eventTy;
    private String eventEndYn;
    private String alarmId;
    private String linkPgm;
    private String condStd;
    private String uclVar;
    private String lclVar;
    private String stdVar;
    private String maintTime;
}
