package com.reportforge.report.controller;

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

import com.reportforge.report.event.ReportExecutionEvent;
import com.reportforge.report.service.ReportEventProducer;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", comments = "Generator version: 7.20.0")
@Controller
@RequestMapping("${openapi.reportService.base-path:/api/v1/reports}")
public class ExecuteApiController implements ExecuteApi {

    private final NativeWebRequest request;
    private final com.reportforge.report.repository.ReportTemplateRepository templateRepository;
    private final ReportEventProducer eventProducer;

    @Autowired
    public ExecuteApiController(NativeWebRequest request,
            com.reportforge.report.repository.ReportTemplateRepository templateRepository,
            ReportEventProducer eventProducer) {
        this.request = request;
        this.templateRepository = templateRepository;
        this.eventProducer = eventProducer;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<Void> executeIdPost(@PathVariable("id") Integer id) {
        return templateRepository.findById(id)
                .map(template -> {
                    // Publish async execution event to Kafka pipeline
                    ReportExecutionEvent event = new ReportExecutionEvent(
                            id,
                            template.getDataSourceName() != null ? template.getDataSourceName() : "analytics-db",
                            template.getQuery() != null ? template.getQuery() : "SELECT 1",
                            "system");
                    eventProducer.publishExecutionRequest(event);
                    return ResponseEntity.accepted().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
