# Config Server

The **Config Server** provides dynamic, centralized configuration management for all microservices in the ReportForge distributed system. Built with Spring Cloud Config, it allows configuration properties to be externalized, version-controlled, and updated dynamically without requiring microservice rebuilds or restarts.

## 🏗️ Architecture & Flow

```mermaid
graph TB
    subgraph "ReportForge Microservices"
        AS["Auth Service<br>(application-auth.yml)"]
        RS["Report Service<br>(application-report.yml)"]
        DP["Data Pipeline<br>(application-pipeline.yml)"]
    end

    CS["Config Server :8888"]

    subgraph "Configuration Repository"
        NativeDir["/configurations directory<br>or Git Repo"]
        AppProps["application.properties"]
        ReportYml["report-service.yml"]
        PipelineYml["data-pipeline-service.yml"]
    end

    CS -->|Reads Config Files| NativeDir
    AS -->|GET /auth-service/default| CS
    RS -->|GET /report-service/default| CS
    DP -->|GET /data-pipeline-service/default| CS

    Note over AS,DP: Each service specifies its name<br>and profile to fetch appropriate config.
```

## ⚙️ Design Considerations

### 1. Centralized Configuration
In a microservice architecture, managing environment-specific properties (DB URLs, Kafka topics, JWT secrets) across dozens of repositories becomes a nightmare. Spring Cloud Config creates a single source of truth. If a database password rotates, it only needs to be updated in one place.

### 2. Native Profile vs. Git Backend
Currently, the Config Server is configured to use the `native` profile `spring.profiles.active=native` with `spring.cloud.config.server.native.search-locations=classpath:/configurations`.
*   **Why Native for Dev?** It dramatically simplifies local development and Docker deployment by bundling the configs directly in the Spring Boot jar's resources without needing SSH keys or Git repo access.
*   **Production Path**: For production, this should be switched to the Git backend (`spring.cloud.config.server.git.uri`), providing full audit trails, rollbacks, and PR reviews for config changes.

### 3. Bootstrap Context
Microservices use `bootstrap.properties` instead of `application.properties` to specify their `spring.application.name` and the `spring.cloud.config.uri`. The bootstrap context initializes *before* the main application context, reaching out to the Config Server to fetch properties before configuring beans like `DataSource` or `KafkaTemplate`.

## 📂 Configuration Structure

The Config Server serves properties based on the requested application name and profile:
```
/configurations/
├── application.properties        # Shared config for all services (e.g., Eureka URL, zipkin)
├── report-service.yml            # Report-specific config (DataSources map, query timeout)
└── data-pipeline-service.yml     # Pipeline rules, Kafka topics, Ingest targets
```

## 🛠️ Tech Stack
*   **Java 17 / Spring Boot 2.7.x**
*   **Spring Cloud Config Server**

## 🚀 Running Locally
```bash
mvn spring-boot:run
# Service will be available on http://localhost:8888
# Test fetching a config: http://localhost:8888/report-service/default
```
