package com.reportforge.dashboard.repository;

import com.reportforge.dashboard.entity.DashboardEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardRepository extends ElasticsearchRepository<DashboardEntity, String> {
}
