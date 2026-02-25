package com.reportforge.report.repository;

import com.reportforge.report.entity.ReportScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportScheduleRepository extends JpaRepository<ReportScheduleEntity, Integer> {
}
