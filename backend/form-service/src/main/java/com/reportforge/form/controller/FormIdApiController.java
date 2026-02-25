package com.reportforge.form.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.context.request.NativeWebRequest;

import javax.validation.constraints.*;
import javax.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.annotation.Generated;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", comments = "Generator version: 7.20.0")
@Controller
@RequestMapping("${openapi.formService.base-path:/api/v1/forms}")
public class FormIdApiController implements FormIdApi {

    private final NativeWebRequest request;
    private final com.reportforge.form.repository.FormSubmissionRepository submissionRepository;

    @Autowired
    public FormIdApiController(NativeWebRequest request,
            com.reportforge.form.repository.FormSubmissionRepository submissionRepository) {
        this.request = request;
        this.submissionRepository = submissionRepository;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<List<Object>> formIdSubmissionsGet(@PathVariable("formId") String formId) {
        java.util.List<com.reportforge.form.entity.FormSubmissionEntity> submissions = submissionRepository
                .findByFormId(formId);
        List<Object> result = new java.util.ArrayList<>();
        for (com.reportforge.form.entity.FormSubmissionEntity s : submissions) {
            result.add(s.getData());
        }
        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<Void> formIdSubmissionsPost(@PathVariable("formId") String formId,
            @Valid @RequestBody Object body) {
        com.reportforge.form.entity.FormSubmissionEntity entity = new com.reportforge.form.entity.FormSubmissionEntity();
        entity.setFormId(formId);
        if (body instanceof java.util.Map) {
            @SuppressWarnings("unchecked")
            java.util.Map<String, Object> dataMap = (java.util.Map<String, Object>) body;
            entity.setData(dataMap);
        } else {
            java.util.Map<String, Object> wrapper = new java.util.HashMap<>();
            wrapper.put("value", body);
            entity.setData(wrapper);
        }
        submissionRepository.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
