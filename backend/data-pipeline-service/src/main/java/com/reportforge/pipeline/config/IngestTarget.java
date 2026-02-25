package com.reportforge.pipeline.config;

import java.util.Map;

/**
 * Defines how data should be persisted in the ingest phase.
 *
 * <p>
 * Supports multiple target types: POSTGRESQL, ELASTICSEARCH, FILE.
 */
public class IngestTarget {
    /** Target type: POSTGRESQL, ELASTICSEARCH, FILE */
    private String type;
    /** Table name (PostgreSQL) or index name (Elasticsearch) */
    private String table;
    /** Index name for Elasticsearch targets */
    private String index;
    /** Write mode: INSERT, UPSERT, APPEND */
    private String mode = "INSERT";
    /** Key fields for upsert operations */
    private java.util.List<String> keyFields;
    /** File path for FILE targets */
    private String filePath;
    /** Additional target-specific properties */
    private Map<String, String> properties;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTable() {
        return table;
    }

    public void setTable(String table) {
        this.table = table;
    }

    public String getIndex() {
        return index;
    }

    public void setIndex(String index) {
        this.index = index;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public java.util.List<String> getKeyFields() {
        return keyFields;
    }

    public void setKeyFields(java.util.List<String> keyFields) {
        this.keyFields = keyFields;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public Map<String, String> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, String> properties) {
        this.properties = properties;
    }

    @Override
    public String toString() {
        return "IngestTarget{type='" + type + "', table='" + table + "', index='" + index + "', mode='" + mode + "'}";
    }
}
