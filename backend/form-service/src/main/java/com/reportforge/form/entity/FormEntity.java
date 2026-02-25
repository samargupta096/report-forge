package com.reportforge.form.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.List;

@Document(indexName = "forms")
public class FormEntity {
    @Id
    private String id;

    @Field(type = FieldType.Keyword)
    private String title;

    @Field(type = FieldType.Text)
    private String description;

    @Field(type = FieldType.Nested)
    private List<Object> fields;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Object> getFields() {
        return fields;
    }

    public void setFields(List<Object> fields) {
        this.fields = fields;
    }
}
