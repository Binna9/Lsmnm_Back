package com.lsmnm.Tag.code.service;

import com.lsmnm.Tag.code.repository.ScoCodeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScoCodeService {

    private final ScoCodeRepository scoCodeRepository;

    private final Map<String, String> codeCache = new HashMap<>();

    /**
     * 코드 값을 코드명으로 변환
     * @param masterCd 마스터 코드
     * @param cdVal 코드 값
     */
    @Transactional(readOnly = true)
    public String convertCodeToName(String masterCd, String cdVal) {

        String cacheKey = masterCd + ":" + cdVal;

        if (codeCache.containsKey(cacheKey)) {
            return codeCache.get(cacheKey);
        }

        String cdNm = scoCodeRepository.findCdNmByMasterCdAndCdVal(masterCd, cdVal)
                .orElse(cdVal);

        codeCache.put(cacheKey, cdNm);

        return cdNm;
    }

    /**
     * DTO 의 코드 필드들을 코드명으로 변환
     * @param dto 변환할 DTO 객체
     * @param codeMappings masterCd와 필드명의 매핑
     */
    public <T> void convertCodesInDto(T dto, Map<String, String> codeMappings) {
        if (dto == null || codeMappings == null) {
            return;
        }

        codeMappings.forEach((masterCd, fieldName) -> {
            try {
                var field = dto.getClass().getDeclaredField(fieldName);
                field.setAccessible(true);
                Object fieldValue = field.get(dto);
                
                if (fieldValue instanceof String) {
                    String cdVal = (String) fieldValue;
                    String cdNm = convertCodeToName(masterCd, cdVal);
                    field.set(dto, cdNm);
                }
            } catch (Exception e) {
                log.warn("코드 변환 실패 - masterCd: {}, fieldName: {}", masterCd, fieldName, e);
            }
        });
    }
}

