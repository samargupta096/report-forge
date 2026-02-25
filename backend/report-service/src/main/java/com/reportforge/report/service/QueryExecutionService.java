package com.reportforge.report.service;

import com.reportforge.report.config.DynamicDataSourceRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.*;
import java.util.*;

/**
 * Generic, stateless service for executing SQL queries against
 * any datasource registered in the {@link DynamicDataSourceRegistry}.
 *
 * <p>
 * This service is the core of the multi-database report execution.
 * It dynamically selects a connection pool by name, runs the query,
 * and returns results as a generic list of maps.
 *
 * <p>
 * Usage:
 * 
 * <pre>
 * List&lt;Map&lt;String, Object&gt;&gt; rows = queryService.execute("analytics-db", "SELECT * FROM sales");
 * </pre>
 */
@Service
public class QueryExecutionService {

    private static final Logger log = LoggerFactory.getLogger(QueryExecutionService.class);

    private final DynamicDataSourceRegistry registry;

    public QueryExecutionService(DynamicDataSourceRegistry registry) {
        this.registry = registry;
    }

    /**
     * Execute a read-only SQL query against the named datasource.
     *
     * @param dataSourceName logical name from YAML config (e.g. "analytics-db")
     * @param sql            the SQL query to execute
     * @return list of rows, each represented as a column-name → value map
     * @throws IllegalArgumentException if the datasource name is not registered
     * @throws RuntimeException         if a SQL or connection error occurs
     */
    public List<Map<String, Object>> execute(String dataSourceName, String sql) {
        DataSource dataSource = registry.getDataSource(dataSourceName);
        if (dataSource == null) {
            throw new IllegalArgumentException(
                    "Unknown datasource: '" + dataSourceName + "'. " +
                            "Available: " + registry.getAvailableDataSources());
        }

        log.info("Executing query on datasource '{}': {}", dataSourceName, truncate(sql, 200));

        List<Map<String, Object>> results = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setQueryTimeout(30); // seconds

            try (ResultSet rs = stmt.executeQuery()) {
                ResultSetMetaData meta = rs.getMetaData();
                int columnCount = meta.getColumnCount();

                while (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    for (int i = 1; i <= columnCount; i++) {
                        row.put(meta.getColumnLabel(i), rs.getObject(i));
                    }
                    results.add(row);
                }
            }

        } catch (SQLException e) {
            log.error("Query failed on datasource '{}': {}", dataSourceName, e.getMessage());
            throw new RuntimeException("Query execution failed: " + e.getMessage(), e);
        }

        log.info("Query on '{}' returned {} row(s)", dataSourceName, results.size());
        return results;
    }

    /**
     * List all registered datasource names.
     */
    public Set<String> listDataSources() {
        return registry.getAvailableDataSources();
    }

    /**
     * Check if a datasource is registered.
     */
    public boolean isAvailable(String dataSourceName) {
        return registry.hasDataSource(dataSourceName);
    }

    private static String truncate(String s, int maxLen) {
        return s.length() <= maxLen ? s : s.substring(0, maxLen) + "...";
    }
}
