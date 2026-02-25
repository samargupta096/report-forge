package com.reportforge.report.repository;

import com.reportforge.report.entity.ReportTemplateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportTemplateRepository extends JpaRepository<ReportTemplateEntity, Integer> {
}
