package com.reportforge.gateway.api;

import org.springframework.cloud.openfeign.FeignClient;
import com.reportforge.gateway.config.ClientConfiguration;

@FeignClient(name="${auth.name:auth}", contextId="${auth.contextId:${auth.name}}", url="${auth.url:http://localhost:8080/api/v1}", configuration = ClientConfiguration.class)
public interface AuthApiClient extends AuthApi {
}
