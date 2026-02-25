package com.reportforge.report.event;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Event published to Kafka when report execution completes.
 * Contains the template ID, status, row count, and optional result data.
 */
public class ReportResultEvent implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer templateId;
    private String status; // SUCCESS, FAILED
    private int rowCount;
    private String errorMessage;
    private List<Map<String, Object>> data;

    public ReportResultEvent() {
    }

    public static ReportResultEvent success(Integer templateId, List<Map<String, Object>> data) {
        ReportResultEvent event = new ReportResultEvent();
        event.setTemplateId(templateId);
        event.setStatus("SUCCESS");
        event.setRowCount(data.size());
        event.setData(data);
        return event;
    }

    public static ReportResultEvent failure(Integer templateId, String errorMessage) {
        ReportResultEvent event = new ReportResultEvent();
        event.setTemplateId(templateId);
        event.setStatus("FAILED");
        event.setRowCount(0);
        event.setErrorMessage(errorMessage);
        return event;
    }

    public Integer getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Integer templateId) {
        this.templateId = templateId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getRowCount() {
        return rowCount;
    }

    public void setRowCount(int rowCount) {
        this.rowCount = rowCount;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public List<Map<String, Object>> getData() {
        return data;
    }

    public void setData(List<Map<String, Object>> data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "ReportResultEvent{templateId=" + templateId +
                ", status='" + status + "', rowCount=" + rowCount + "}";
    }
}
