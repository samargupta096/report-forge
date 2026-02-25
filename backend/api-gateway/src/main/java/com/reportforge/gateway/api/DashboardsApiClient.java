package com.reportforge.gateway.api;

import org.springframework.cloud.openfeign.FeignClient;
import com.reportforge.gateway.config.ClientConfiguration;

@FeignClient(name="${dashboards.name:dashboards}", contextId="${dashboards.contextId:${dashboards.name}}", url="${dashboards.url:http://localhost:8080/api/v1}", configuration = ClientConfiguration.class)
public interface DashboardsApiClient extends DashboardsApi {
}
