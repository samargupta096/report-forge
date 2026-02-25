package com.reportforge.form.repository;

import com.reportforge.form.entity.FormSubmissionEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormSubmissionRepository extends ElasticsearchRepository<FormSubmissionEntity, String> {
    List<FormSubmissionEntity> findByFormId(String formId);
}
