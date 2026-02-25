package com.reportforge.pipeline.model;

import java.io.Serializable;
import java.time.Instant;
import java.util.Map;

/**
 * Wrapper for a record flowing through the pipeline.
 * Carries metadata alongside the actual data payload.
 */
public class PipelineRecord implements Serializable {
    private static final long serialVersionUID = 1L;

    private String pipelineId;
    private int phaseIndex;
    private String phaseName;
    private Map<String, Object> data;
    private String timestamp;
    private String traceId;

    public PipelineRecord() {
    }

    public PipelineRecord(String pipelineId, int phaseIndex, String phaseName, Map<String, Object> data) {
        this.pipelineId = pipelineId;
        this.phaseIndex = phaseIndex;
        this.phaseName = phaseName;
        this.data = data;
        this.timestamp = Instant.now().toString();
        this.traceId = java.util.UUID.randomUUID().toString().substring(0, 8);
    }

    public String getPipelineId() {
        return pipelineId;
    }

    public void setPipelineId(String pipelineId) {
        this.pipelineId = pipelineId;
    }

    public int getPhaseIndex() {
        return phaseIndex;
    }

    public void setPhaseIndex(int phaseIndex) {
        this.phaseIndex = phaseIndex;
    }

    public String getPhaseName() {
        return phaseName;
    }

    public void setPhaseName(String phaseName) {
        this.phaseName = phaseName;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getTraceId() {
        return traceId;
    }

    public void setTraceId(String traceId) {
        this.traceId = traceId;
    }

    @Override
    public String toString() {
        return "PipelineRecord{pipeline='" + pipelineId + "', phase=" + phaseName +
                "[" + phaseIndex + "], trace=" + traceId + "}";
    }
}
