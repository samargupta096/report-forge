package com.reportforge.report.controller;

import com.reportforge.report.model.ScheduleRequest;

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
public class SchedulesApiController implements SchedulesApi {

    private final NativeWebRequest request;
    private final com.reportforge.report.repository.ReportScheduleRepository scheduleRepository;

    @Autowired
    public SchedulesApiController(NativeWebRequest request,
            com.reportforge.report.repository.ReportScheduleRepository scheduleRepository) {
        this.request = request;
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<Void> schedulesPost(@Valid @RequestBody ScheduleRequest scheduleRequest) {
        com.reportforge.report.entity.ReportScheduleEntity entity = new com.reportforge.report.entity.ReportScheduleEntity();
        entity.setTemplateId(scheduleRequest.getTemplateId());
        entity.setCronExpression(scheduleRequest.getCronExpression());
        entity.setFormat(scheduleRequest.getFormat());
        scheduleRepository.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
