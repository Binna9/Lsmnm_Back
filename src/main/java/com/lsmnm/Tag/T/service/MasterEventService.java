package com.lsmnm.Tag.T.service;

import com.lsmnm.Tag.T.dto.*;
import com.lsmnm.Tag.T.entity.MasterEvent;
import com.lsmnm.Tag.T.repository.MasterEventRepository;
import com.lsmnm.Tag.exception.BadRequestException;
import com.lsmnm.Tag.exception.InternalServerException;
import com.lsmnm.Tag.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MasterEventService {

    private final MasterEventRepository masterEventRepository;

    @Transactional
    public List<MasterEventSearchResponseDto> getMasterEventSearch(MasterEventSearchRequestDto requestDto) {

        var tag  = requestDto.getTagId();
        var recv = requestDto.getEventRecvTy();

        return masterEventRepository.getMasterEvents(tag, recv)
                .stream()
                .map(p -> new MasterEventSearchResponseDto(
                        p.getTagId(), p.getTagNm(), p.getEventSeq(), p.getEventDesc(),
                        p.getEventTy(), p.getEventEndYn(), p.getAlarmId(), p.getLinkPgm(),
                        p.getCondStd(), p.getUclVal(), p.getLclVal(), p.getStdVal(), p.getMaintTime()
                ))
                .toList();
    }

    @Transactional
    public void saveEvent(MasterEventSaveDto dto) {
        masterEventRepository.callSave(
                dto.getTagId(),
                dto.getEventSeq(),
                dto.getEventDesc(),
                dto.getEventTy(),
                dto.getEventEndYn(),
                dto.getAlarmId(),
                dto.getLinkPgm(),
                dto.getCondStd(),
                dto.getUclVal(),
                dto.getLclVal(),
                dto.getStdVal(),
                dto.getMaintTime()
        );
    }

    @Transactional
    public void deleteMasterEvent(MasterEventDeleteDto requestDto) {

        if (!StringUtils.hasText(requestDto.getTagId()) || !StringUtils.hasText(requestDto.getEventRecvTy())) {
            throw new BadRequestException("error.masterevent.required");
        }

        MasterEvent masterEvent = masterEventRepository
                .findByIdTagIdAndIdEventSeq(requestDto.getTagId(), requestDto.getEventRecvTy())
                .orElseThrow(() -> new NotFoundException("error.masterevent.notfound"));

        try {
            masterEventRepository.delete(masterEvent);
        } catch (Exception e) {
            throw new InternalServerException("error.masterevent.delete.failed");
        }
    }
}
