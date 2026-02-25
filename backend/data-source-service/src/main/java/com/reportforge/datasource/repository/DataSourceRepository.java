package com.reportforge.datasource.repository;

import com.reportforge.datasource.entity.DataSourceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataSourceRepository extends JpaRepository<DataSourceEntity, Integer> {
}
