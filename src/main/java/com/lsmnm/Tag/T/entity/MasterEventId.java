package com.lsmnm.Tag.T.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.*;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MasterEventId {

    @Column(name = "tag_id")
    private String tagId;

    @Column(name = "event_seq")
    private String eventSeq;
}
