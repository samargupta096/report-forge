package com.reportforge.dashboard.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

@Document(indexName = "dashboards")
public class DashboardEntity {
    @Id
    private String id;

    @Field(type = FieldType.Keyword)
    private String name;

    @Field(type = FieldType.Text)
    private String description;

    @Field(type = FieldType.Date)
    private OffsetDateTime version;

    @Field(type = FieldType.Nested)
    private List<Map<String, Object>> config;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public OffsetDateTime getVersion() {
        return version;
    }

    public void setVersion(OffsetDateTime version) {
        this.version = version;
    }

    public List<Map<String, Object>> getConfig() {
        return config;
    }

    public void setConfig(List<Map<String, Object>> config) {
        this.config = config;
    }
}
