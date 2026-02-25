package com.reportforge.form.repository;

import com.reportforge.form.entity.FormEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormRepository extends ElasticsearchRepository<FormEntity, String> {
}
