package com.reportforge.dashboard.controller;

import com.reportforge.dashboard.model.Dashboard;
import com.reportforge.dashboard.model.DashboardRequest;

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
@RequestMapping("${openapi.dashboardService.base-path:/api/v1/dashboards}")
public class DefaultApiController implements DefaultApi {

    private final NativeWebRequest request;
    private final com.reportforge.dashboard.repository.DashboardRepository dashboardRepository;

    @Autowired
    public DefaultApiController(NativeWebRequest request,
            com.reportforge.dashboard.repository.DashboardRepository dashboardRepository) {
        this.request = request;
        this.dashboardRepository = dashboardRepository;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<List<Dashboard>> rootGet() {
        List<Dashboard> dashboards = new java.util.ArrayList<>();
        Iterable<com.reportforge.dashboard.entity.DashboardEntity> entities = dashboardRepository.findAll();
        for (com.reportforge.dashboard.entity.DashboardEntity entity : entities) {
            Dashboard d = new Dashboard();
            d.setId(entity.getId());
            d.setName(entity.getName());
            d.setDescription(entity.getDescription());
            d.setOwnerId(entity.getOwnerId());
            d.setLayout(entity.getLayout());
            d.setWidgets(entity.getWidgets());
            dashboards.add(d);
        }
        return ResponseEntity.ok(dashboards);
    }

    @Override
    public ResponseEntity<Void> rootPost(@Valid @RequestBody DashboardRequest dashboardRequest) {
        com.reportforge.dashboard.entity.DashboardEntity entity = new com.reportforge.dashboard.entity.DashboardEntity();
        entity.setName(dashboardRequest.getName());
        entity.setDescription(dashboardRequest.getDescription());
        dashboardRepository.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
