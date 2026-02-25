package com.reportforge.gateway.api;

import org.springframework.cloud.openfeign.FeignClient;
import com.reportforge.gateway.config.ClientConfiguration;

@FeignClient(name="${data-source.name:data-source}", contextId="${data-source.contextId:${data-source.name}}", url="${data-source.url:http://localhost:8080/api/v1}", configuration = ClientConfiguration.class)
public interface DataSourceApiClient extends DataSourceApi {
}
