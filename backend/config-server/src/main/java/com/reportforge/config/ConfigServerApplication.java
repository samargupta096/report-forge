package com.reportforge.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

/**
 * Spring Cloud Config Server.
 * Serves externalized configuration to all microservices from
 * native classpath resources (configurations/ folder).
 *
 * <p>
 * Each microservice retrieves its properties via:
 * {@code http://config-server:8888/{application}/{profile}}
 */
@SpringBootApplication
@EnableConfigServer
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
