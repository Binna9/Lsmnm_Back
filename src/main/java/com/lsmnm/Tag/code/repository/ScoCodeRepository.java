package com.lsmnm.Tag.code.repository;

import com.lsmnm.Tag.code.entity.ScoCode;
import com.lsmnm.Tag.code.entity.ScoCodeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ScoCodeRepository extends JpaRepository<ScoCode, ScoCodeId> {

    @Query(value = """
            SELECT cd.cd_nm
            FROM scom.sco_code_detail cd
            WHERE cd.master_cd = :masterCd
              AND cd.cd_val = :cdVal
            """, nativeQuery = true)
    Optional<String> findCdNmByMasterCdAndCdVal(
            @Param("masterCd") String masterCd,
            @Param("cdVal") String cdVal
    );
}

