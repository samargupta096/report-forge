package com.reportforge.gateway.api;

import org.springframework.cloud.openfeign.FeignClient;
import com.reportforge.gateway.config.ClientConfiguration;

@FeignClient(name="${reports.name:reports}", contextId="${reports.contextId:${reports.name}}", url="${reports.url:http://localhost:8080/api/v1}", configuration = ClientConfiguration.class)
public interface ReportsApiClient extends ReportsApi {
}
