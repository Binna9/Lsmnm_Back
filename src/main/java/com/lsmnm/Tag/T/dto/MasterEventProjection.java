package com.lsmnm.Tag.T.dto;

import java.math.BigDecimal;

public interface MasterEventProjection {
    String getTagId();
    String getTagNm();
    Integer getEventSeq();
    String getEventDesc();
    String getEventTy();
    String getEventEndYn();
    String getAlarmId();
    String getLinkPgm();
    String getCondStd();
    BigDecimal getUclVal();
    BigDecimal getLclVal();
    BigDecimal getStdVal();
    BigDecimal getMaintTime();
}
