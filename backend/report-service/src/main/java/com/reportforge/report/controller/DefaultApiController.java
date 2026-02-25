package com.reportforge.report.controller;

import com.reportforge.report.model.ReportTemplate;
import com.reportforge.report.model.TemplateRequest;

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
@RequestMapping("${openapi.reportService.base-path:/api/v1/reports}")
public class DefaultApiController implements DefaultApi {

    private final NativeWebRequest request;
    private final com.reportforge.report.repository.ReportTemplateRepository templateRepository;

    @Autowired
    public DefaultApiController(NativeWebRequest request,
            com.reportforge.report.repository.ReportTemplateRepository templateRepository) {
        this.request = request;
        this.templateRepository = templateRepository;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<List<ReportTemplate>> rootGet() {
        List<com.reportforge.report.entity.ReportTemplateEntity> entities = templateRepository.findAll();
        List<ReportTemplate> result = new java.util.ArrayList<>();
        for (com.reportforge.report.entity.ReportTemplateEntity e : entities) {
            ReportTemplate t = new ReportTemplate();
            t.setId(e.getId());
            t.setName(e.getName());
            t.setDescription(e.getDescription());
            t.setType(e.getType());
            t.setUpdatedAt(e.getUpdatedAt());
            result.add(t);
        }
        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<Void> rootPost(@Valid @RequestBody TemplateRequest templateRequest) {
        com.reportforge.report.entity.ReportTemplateEntity entity = new com.reportforge.report.entity.ReportTemplateEntity();
        entity.setName(templateRequest.getName());
        entity.setDescription(templateRequest.getDescription());
        entity.setType(templateRequest.getType());
        templateRepository.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
