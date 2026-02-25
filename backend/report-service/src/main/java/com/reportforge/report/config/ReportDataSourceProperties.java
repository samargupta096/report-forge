package com.reportforge.report.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Configuration-based external datasource definitions.
 *
 * <p>
 * Reads from {@code report.datasources.sources} in application.yml.
 * Each key in the map is a logical datasource name (e.g. "analytics-db"),
 * and the value contains JDBC connection parameters.
 *
 * <p>
 * To add a new database, simply add a new entry under
 * {@code report.datasources.sources} in the YAML — no code changes required.
 *
 * <pre>
 * report:
 *   datasources:
 *     sources:
 *       my-new-db:
 *         url: jdbc:postgresql://host:5432/mydb
 *         username: user
 *         password: pass
 *         driver-class-name: org.postgresql.Driver
 *         max-pool-size: 5
 * </pre>
 */
@Component
@ConfigurationProperties(prefix = "report.datasources")
public class ReportDataSourceProperties {

    private Map<String, DataSourceDefinition> sources = new HashMap<>();

    public Map<String, DataSourceDefinition> getSources() {
        return sources;
    }

    public void setSources(Map<String, DataSourceDefinition> sources) {
        this.sources = sources;
    }

    /**
     * POJO representing a single external datasource configuration.
     */
    public static class DataSourceDefinition {
        private String url;
        private String username;
        private String password;
        private String driverClassName;
        private int maxPoolSize = 5;

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getDriverClassName() {
            return driverClassName;
        }

        public void setDriverClassName(String driverClassName) {
            this.driverClassName = driverClassName;
        }

        public int getMaxPoolSize() {
            return maxPoolSize;
        }

        public void setMaxPoolSize(int maxPoolSize) {
            this.maxPoolSize = maxPoolSize;
        }

        @Override
        public String toString() {
            return "DataSourceDefinition{url='" + url + "', driverClassName='" + driverClassName + "'}";
        }
    }
}
