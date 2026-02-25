package com.reportforge.datasource.controller;

import com.reportforge.datasource.model.DataSourceConfig;
import com.reportforge.datasource.model.DataSourceRequest;

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
@RequestMapping("${openapi.dataSourceService.base-path:/api/v1/data-sources}")
public class DefaultApiController implements DefaultApi {

    private final NativeWebRequest request;
    private final com.reportforge.datasource.repository.DataSourceRepository dataSourceRepository;

    @Autowired
    public DefaultApiController(NativeWebRequest request,
            com.reportforge.datasource.repository.DataSourceRepository dataSourceRepository) {
        this.request = request;
        this.dataSourceRepository = dataSourceRepository;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<List<DataSourceConfig>> rootGet() {
        List<com.reportforge.datasource.entity.DataSourceEntity> entities = dataSourceRepository.findAll();
        List<DataSourceConfig> result = new java.util.ArrayList<>();
        for (com.reportforge.datasource.entity.DataSourceEntity e : entities) {
            DataSourceConfig dto = new DataSourceConfig();
            dto.setId(e.getId());
            dto.setName(e.getName());
            dto.setType(e.getType());
            dto.setUrl(e.getUrl());
            dto.setStatus(DataSourceConfig.StatusEnum.valueOf(e.getStatus().name()));
            result.add(dto);
        }
        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<Void> rootPost(@Valid @RequestBody DataSourceRequest dataSourceRequest) {
        com.reportforge.datasource.entity.DataSourceEntity entity = new com.reportforge.datasource.entity.DataSourceEntity();
        entity.setName(dataSourceRequest.getName());
        entity.setType(dataSourceRequest.getType());
        entity.setUrl(dataSourceRequest.getUrl());
        entity.setUsername(dataSourceRequest.getUsername());
        entity.setPassword(dataSourceRequest.getPassword());
        entity.setStatus(com.reportforge.datasource.entity.DataSourceEntity.DataSourceStatus.DISCONNECTED);
        dataSourceRepository.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
