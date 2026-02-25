package com.reportforge.pipeline.processor;

import com.reportforge.pipeline.config.IngestTarget;
import com.reportforge.pipeline.config.PhaseDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Persists records to the configured target.
 *
 * <p>
 * Supported target types:
 * <ul>
 * <li><b>POSTGRESQL</b> — INSERT or UPSERT into a table</li>
 * <li><b>ELASTICSEARCH</b> — index into an ES index</li>
 * <li><b>FILE</b> — append to a file (placeholder)</li>
 * <li><b>LOG</b> — log the record (useful for debugging)</li>
 * </ul>
 */
@Component
public class IngestProcessor implements PhaseProcessor {

    private static final Logger log = LoggerFactory.getLogger(IngestProcessor.class);

    private final JdbcTemplate jdbcTemplate;

    public IngestProcessor(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public String getPhaseName() {
        return "ingest";
    }

    @Override
    public Map<String, Object> process(Map<String, Object> record, PhaseDefinition phase) {
        IngestTarget target = phase.getTarget();
        if (target == null) {
            throw new ProcessingException("ingest", "TARGET",
                    "No ingest target configured for this phase");
        }

        String targetType = target.getType().toUpperCase();
        switch (targetType) {
            case "POSTGRESQL":
                ingestPostgres(record, target);
                break;
            case "ELASTICSEARCH":
                ingestElasticsearch(record, target);
                break;
            case "LOG":
                log.info("INGEST [LOG]: {}", record);
                break;
            case "FILE":
                log.info("INGEST [FILE]: path={}, record={}", target.getFilePath(), record);
                // Placeholder: implement file writing
                break;
            default:
                throw new ProcessingException("ingest", "TARGET",
                        "Unknown ingest target type: " + targetType);
        }
        return record;
    }

    private void ingestPostgres(Map<String, Object> record, IngestTarget target) {
        String table = target.getTable();
        String mode = target.getMode() != null ? target.getMode().toUpperCase() : "INSERT";

        List<String> columns = new ArrayList<>(record.keySet());
        List<Object> values = columns.stream().map(record::get).collect(Collectors.toList());
        String placeholders = columns.stream().map(c -> "?").collect(Collectors.joining(", "));
        String columnNames = columns.stream().map(c -> "\"" + c + "\"").collect(Collectors.joining(", "));

        String sql;
        if ("UPSERT".equals(mode) && target.getKeyFields() != null && !target.getKeyFields().isEmpty()) {
            String conflictCols = target.getKeyFields().stream()
                    .map(k -> "\"" + k + "\"")
                    .collect(Collectors.joining(", "));
            String updateSet = columns.stream()
                    .filter(c -> !target.getKeyFields().contains(c))
                    .map(c -> "\"" + c + "\" = EXCLUDED.\"" + c + "\"")
                    .collect(Collectors.joining(", "));

            sql = "INSERT INTO " + table + " (" + columnNames + ") VALUES (" + placeholders + ") " +
                    "ON CONFLICT (" + conflictCols + ") DO UPDATE SET " + updateSet;
        } else {
            sql = "INSERT INTO " + table + " (" + columnNames + ") VALUES (" + placeholders + ")";
        }

        try {
            jdbcTemplate.update(sql, values.toArray());
            log.debug("Ingested record into PostgreSQL table '{}': {} columns", table, columns.size());
        } catch (Exception e) {
            throw new ProcessingException("ingest", "POSTGRESQL",
                    "Failed to ingest into " + table + ": " + e.getMessage());
        }
    }

    private void ingestElasticsearch(Map<String, Object> record, IngestTarget target) {
        String index = target.getIndex() != null ? target.getIndex() : target.getTable();
        // In production, use ElasticsearchRestTemplate.index()
        log.info("INGEST [ES]: index={}, record keys={}", index, record.keySet());
        // Placeholder — inject ElasticsearchRestTemplate for full implementation
    }
}
