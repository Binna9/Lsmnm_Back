package com.lsmnm.Tag.alarm.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmLogSearchDto {

    // 검색 조건
    private String plantCd;
    private String alarmType;
    private String confYn;
    private String alarmId;
    
    // 날짜 범위 검색
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    
    // 페이징
    @Builder.Default
    private int page = 0;
    @Builder.Default
    private int size = 20;
    
    // 정렬
    @Builder.Default
    private String sortBy = "crtTm";
    @Builder.Default
    private String sortDirection = "DESC";
}
