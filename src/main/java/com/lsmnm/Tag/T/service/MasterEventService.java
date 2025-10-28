package com.lsmnm.Tag.T.service;

import com.lsmnm.Tag.T.dto.MasterEventRequestDto;
import com.lsmnm.Tag.T.dto.MasterEventResponseDto;
import com.lsmnm.Tag.T.entity.MasterEvent;
import com.lsmnm.Tag.T.entity.MasterEventId;
import com.lsmnm.Tag.T.repository.MasterEventRepository;
import com.lsmnm.Tag.exception.BadRequestException;
import com.lsmnm.Tag.exception.InternalServerException;
import com.lsmnm.Tag.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MasterEventService {

    private final MasterEventRepository masterEventRepository;

    /**
     * MasterEvent 조회 (단일)
     */
    @Transactional(readOnly = true)
    public MasterEventResponseDto getMasterEvent(String tagId, String eventSeq) {
        
        if (!StringUtils.hasText(tagId)) {
            throw new BadRequestException("error.masterevent.tagid.required");
        }
        
        if (!StringUtils.hasText(eventSeq)) {
            throw new BadRequestException("error.masterevent.eventseq.required");
        }

        MasterEvent masterEvent = masterEventRepository
                .findByIdTagIdAndIdEventSeq(tagId, eventSeq)
                .orElseThrow(() -> new NotFoundException("error.masterevent.notfound"));

        return convertToDto(masterEvent);
    }

    /**
     * MasterEvent 검색 (리스트)
     */
    @Transactional(readOnly = true)
    public List<MasterEventResponseDto> searchMasterEvents(MasterEventRequestDto requestDto) {
        
        List<MasterEvent> events = masterEventRepository.searchMasterEvents(
                requestDto.getTagId(),
                requestDto.getEventSeq(),
                requestDto.getEventDesc(),
                requestDto.getEventTy(),
                requestDto.getEventEndYn(),
                requestDto.getAlarmId()
        );

        return events.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * MasterEvent 생성
     */
    @Transactional
    public MasterEventResponseDto createMasterEvent(MasterEventRequestDto requestDto) {
        
        if (!StringUtils.hasText(requestDto.getTagId())) {
            throw new BadRequestException("error.masterevent.tagid.required");
        }

        if (!StringUtils.hasText(requestDto.getEventSeq())) {
            throw new BadRequestException("error.masterevent.eventseq.required");
        }

        // 중복 체크
        Optional<MasterEvent> existingEvent = masterEventRepository.findByIdTagIdAndIdEventSeq(
                requestDto.getTagId(), requestDto.getEventSeq()
        );

        if (existingEvent.isPresent()) {
            throw new BadRequestException("error.masterevent.alreadyexists");
        }

        MasterEventId id = MasterEventId.builder()
                .tagId(requestDto.getTagId())
                .eventSeq(requestDto.getEventSeq())
                .build();

        MasterEvent masterEvent = MasterEvent.builder()
                .id(id)
                .crtUserId(requestDto.getCrtUserId())
                .crtObjId(requestDto.getCrtObjId())
                .crtTm(requestDto.getCrtTm())
                .updUserId(requestDto.getUpdUserId())
                .updObjId(requestDto.getUpdObjId())
                .updTm(requestDto.getUpdTm())
                .archiveFl(requestDto.getArchiveFl())
                .eventDesc(requestDto.getEventDesc())
                .eventTy(requestDto.getEventTy())
                .eventEndYn(requestDto.getEventEndYn())
                .alarmId(requestDto.getAlarmId())
                .linkPgm(requestDto.getLinkPgm())
                .condStd(requestDto.getCondStd())
                .uclVar(requestDto.getUclVar())
                .lclVar(requestDto.getLclVar())
                .stdVar(requestDto.getStdVar())
                .maintTime(requestDto.getMaintTime())
                .build();

        try {
            MasterEvent savedEvent = masterEventRepository.save(masterEvent);
            return convertToDto(savedEvent);
        } catch (Exception e) {
            log.error("MasterEvent 생성 중 오류 발생: ", e);
            throw new InternalServerException("error.masterevent.create.failed");
        }
    }

    /**
     * MasterEvent 수정
     */
    @Transactional
    public MasterEventResponseDto updateMasterEvent(String tagId, String eventSeq, MasterEventRequestDto requestDto) {
        
        MasterEvent masterEvent = masterEventRepository
                .findByIdTagIdAndIdEventSeq(tagId, eventSeq)
                .orElseThrow(() -> new NotFoundException("error.masterevent.notfound"));

        // 수정 가능한 필드 업데이트
        if (StringUtils.hasText(requestDto.getEventDesc())) {
            masterEvent.setEventDesc(requestDto.getEventDesc());
        }
        if (StringUtils.hasText(requestDto.getEventTy())) {
            masterEvent.setEventTy(requestDto.getEventTy());
        }
        if (StringUtils.hasText(requestDto.getEventEndYn())) {
            masterEvent.setEventEndYn(requestDto.getEventEndYn());
        }
        if (StringUtils.hasText(requestDto.getAlarmId())) {
            masterEvent.setAlarmId(requestDto.getAlarmId());
        }
        if (StringUtils.hasText(requestDto.getLinkPgm())) {
            masterEvent.setLinkPgm(requestDto.getLinkPgm());
        }
        if (StringUtils.hasText(requestDto.getCondStd())) {
            masterEvent.setCondStd(requestDto.getCondStd());
        }
        if (StringUtils.hasText(requestDto.getUclVar())) {
            masterEvent.setUclVar(requestDto.getUclVar());
        }
        if (StringUtils.hasText(requestDto.getLclVar())) {
            masterEvent.setLclVar(requestDto.getLclVar());
        }
        if (StringUtils.hasText(requestDto.getStdVar())) {
            masterEvent.setStdVar(requestDto.getStdVar());
        }
        if (StringUtils.hasText(requestDto.getMaintTime())) {
            masterEvent.setMaintTime(requestDto.getMaintTime());
        }
        if (StringUtils.hasText(requestDto.getUpdUserId())) {
            masterEvent.setUpdUserId(requestDto.getUpdUserId());
        }
        if (StringUtils.hasText(requestDto.getUpdObjId())) {
            masterEvent.setUpdObjId(requestDto.getUpdObjId());
        }
        if (StringUtils.hasText(requestDto.getUpdTm())) {
            masterEvent.setUpdTm(requestDto.getUpdTm());
        }

        try {
            MasterEvent updatedEvent = masterEventRepository.save(masterEvent);
            return convertToDto(updatedEvent);
        } catch (Exception e) {
            log.error("MasterEvent 수정 중 오류 발생: ", e);
            throw new InternalServerException("error.masterevent.update.failed");
        }
    }

    /**
     * MasterEvent 삭제
     */
    @Transactional
    public void deleteMasterEvent(String tagId, String eventSeq) {
        
        if (!StringUtils.hasText(tagId)) {
            throw new BadRequestException("error.masterevent.tagid.required");
        }

        MasterEvent masterEvent = masterEventRepository
                .findByIdTagIdAndIdEventSeq(tagId, eventSeq)
                .orElseThrow(() -> new NotFoundException("error.masterevent.notfound"));

        try {
            masterEventRepository.delete(masterEvent);
        } catch (Exception e) {
            log.error("MasterEvent 삭제 중 오류 발생: ", e);
            throw new InternalServerException("error.masterevent.delete.failed");
        }
    }

    /**
     * MasterEvent 일괄 삭제 (tagId 기준)
     */
    @Transactional
    public void deleteMasterEventsByTagId(String tagId) {
        
        if (!StringUtils.hasText(tagId)) {
            throw new BadRequestException("error.masterevent.tagid.required");
        }

        try {
            masterEventRepository.deleteByIdTagId(tagId);
        } catch (Exception e) {
            log.error("MasterEvent 일괄 삭제 중 오류 발생: ", e);
            throw new InternalServerException("error.masterevent.delete.failed");
        }
    }

    /**
     * MasterEvent -> DTO 변환
     */
    private MasterEventResponseDto convertToDto(MasterEvent masterEvent) {
        return MasterEventResponseDto.builder()
                .tagId(masterEvent.getId().getTagId())
                .eventSeq(masterEvent.getId().getEventSeq())
                .crtUserId(masterEvent.getCrtUserId())
                .crtObjId(masterEvent.getCrtObjId())
                .crtTm(masterEvent.getCrtTm())
                .updUserId(masterEvent.getUpdUserId())
                .updObjId(masterEvent.getUpdObjId())
                .updTm(masterEvent.getUpdTm())
                .archiveFl(masterEvent.getArchiveFl())
                .eventDesc(masterEvent.getEventDesc())
                .eventTy(masterEvent.getEventTy())
                .eventEndYn(masterEvent.getEventEndYn())
                .alarmId(masterEvent.getAlarmId())
                .linkPgm(masterEvent.getLinkPgm())
                .condStd(masterEvent.getCondStd())
                .uclVar(masterEvent.getUclVar())
                .lclVar(masterEvent.getLclVar())
                .stdVar(masterEvent.getStdVar())
                .maintTime(masterEvent.getMaintTime())
                .build();
    }
}
