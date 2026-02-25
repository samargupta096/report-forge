package com.reportforge.gateway.api;

import org.springframework.cloud.openfeign.FeignClient;
import com.reportforge.gateway.config.ClientConfiguration;

@FeignClient(name="${forms.name:forms}", contextId="${forms.contextId:${forms.name}}", url="${forms.url:http://localhost:8080/api/v1}", configuration = ClientConfiguration.class)
public interface FormsApiClient extends FormsApi {
}
