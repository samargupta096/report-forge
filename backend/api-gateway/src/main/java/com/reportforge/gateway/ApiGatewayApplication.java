package com.reportforge.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * API Gateway entry point.
 * Routes all incoming requests to the appropriate microservice.
 *
 * <p>
 * Route mapping:
 * <ul>
 * <li>/api/auth/** → auth-service (port 8081)</li>
 * <li>/api/dashboards/** → dashboard-service (port 8082)</li>
 * <li>/api/reports/** → report-service (port 8083)</li>
 * <li>/api/forms/** → form-service (port 8084)</li>
 * <li>/api/datasources/**→ data-source-service (port 8085)</li>
 * </ul>
 */
@SpringBootApplication
public class ApiGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}
