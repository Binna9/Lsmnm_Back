package com.lsmnm.Tag.T.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MasterEventRequestDto {

    // 검색 필드
    private String tagId;
    private String eventSeq;
    private String eventDesc;
    private String eventTy;
    private String eventEndYn;
    private String alarmId;
    
    // 생성/수정 필드
    private String crtUserId;
    private String crtObjId;
    private String crtTm;
    private String updUserId;
    private String updObjId;
    private String updTm;
    private String archiveFl;
    private String linkPgm;
    private String condStd;
    private String uclVar;
    private String lclVar;
    private String stdVar;
    private String maintTime;
    
    // 리스트 조회용
    private Integer page;
    private Integer size;
    
    // 일괄 생성용
    private List<MasterEventRequestDto> events;
}
