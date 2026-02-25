package com.reportforge.report.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.sql.DataSource;
import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Registry that creates and manages HikariCP connection pools
 * for every datasource declared in {@code report.datasources.sources}.
 *
 * <p>
 * Usage:
 * 
 * <pre>
 * DataSource ds = registry.getDataSource("analytics-db");
 * </pre>
 *
 * <p>
 * Thread-safe. Pools are lazily initialised at startup and
 * closed cleanly on application shutdown.
 */
@Component
public class DynamicDataSourceRegistry {

    private static final Logger log = LoggerFactory.getLogger(DynamicDataSourceRegistry.class);

    private final ReportDataSourceProperties properties;
    private final Map<String, HikariDataSource> registry = new ConcurrentHashMap<>();

    public DynamicDataSourceRegistry(ReportDataSourceProperties properties) {
        this.properties = properties;
    }

    /**
     * On startup, iterate over all configured datasource definitions
     * and create a HikariCP pool for each.
     */
    @PostConstruct
    public void init() {
        properties.getSources().forEach((name, definition) -> {
            log.info("Registering report datasource: {} -> {}", name, definition.getUrl());
            HikariConfig config = new HikariConfig();
            config.setPoolName("report-" + name);
            config.setJdbcUrl(definition.getUrl());
            config.setUsername(definition.getUsername());
            config.setPassword(definition.getPassword());
            config.setDriverClassName(definition.getDriverClassName());
            config.setMaximumPoolSize(definition.getMaxPoolSize());
            config.setMinimumIdle(1);
            config.setConnectionTimeout(30_000);
            config.setIdleTimeout(600_000);
            config.setMaxLifetime(1_800_000);
            registry.put(name, new HikariDataSource(config));
        });
        log.info("Registered {} report datasource(s): {}", registry.size(), registry.keySet());
    }

    /**
     * Retrieve a DataSource by its logical name (the key in YAML).
     *
     * @param name the datasource key, e.g. "analytics-db"
     * @return the HikariDataSource, or null if not configured
     */
    public DataSource getDataSource(String name) {
        return registry.get(name);
    }

    /**
     * @return an unmodifiable set of all registered datasource names
     */
    public Set<String> getAvailableDataSources() {
        return Collections.unmodifiableSet(registry.keySet());
    }

    /**
     * Check if a datasource exists in the registry.
     */
    public boolean hasDataSource(String name) {
        return registry.containsKey(name);
    }

    /**
     * Cleanly close all connection pools on shutdown.
     */
    @PreDestroy
    public void destroy() {
        registry.forEach((name, ds) -> {
            log.info("Closing report datasource pool: {}", name);
            ds.close();
        });
    }
}
