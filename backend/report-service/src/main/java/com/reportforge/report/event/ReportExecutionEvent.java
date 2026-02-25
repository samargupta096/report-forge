package com.reportforge.report.event;

import java.io.Serializable;

/**
 * Event published to Kafka when a report execution is requested.
 * Contains the template ID, the datasource to query, and the SQL to run.
 */
public class ReportExecutionEvent implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer templateId;
    private String dataSourceName;
    private String sql;
    private String requestedBy;

    public ReportExecutionEvent() {
    }

    public ReportExecutionEvent(Integer templateId, String dataSourceName, String sql, String requestedBy) {
        this.templateId = templateId;
        this.dataSourceName = dataSourceName;
        this.sql = sql;
        this.requestedBy = requestedBy;
    }

    public Integer getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Integer templateId) {
        this.templateId = templateId;
    }

    public String getDataSourceName() {
        return dataSourceName;
    }

    public void setDataSourceName(String dataSourceName) {
        this.dataSourceName = dataSourceName;
    }

    public String getSql() {
        return sql;
    }

    public void setSql(String sql) {
        this.sql = sql;
    }

    public String getRequestedBy() {
        return requestedBy;
    }

    public void setRequestedBy(String requestedBy) {
        this.requestedBy = requestedBy;
    }

    @Override
    public String toString() {
        return "ReportExecutionEvent{templateId=" + templateId +
                ", dataSourceName='" + dataSourceName + "'" +
                ", requestedBy='" + requestedBy + "'}";
    }
}
