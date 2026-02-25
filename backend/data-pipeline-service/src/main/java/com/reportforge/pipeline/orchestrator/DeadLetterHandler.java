package com.reportforge.pipeline.orchestrator;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reportforge.pipeline.config.PipelineProperties;
import com.reportforge.pipeline.model.PipelineRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Routes failed records to the dead-letter queue with full error context.
 */
@Component
public class DeadLetterHandler {

    private static final Logger log = LoggerFactory.getLogger(DeadLetterHandler.class);

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final PipelineProperties properties;
    private final ObjectMapper objectMapper;

    public DeadLetterHandler(KafkaTemplate<String, String> kafkaTemplate,
            PipelineProperties properties,
            ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.properties = properties;
        this.objectMapper = objectMapper;
    }

    /**
     * Send a failed record to the DLQ with error metadata.
     */
    public void sendToDeadLetter(PipelineRecord record, String errorMessage, String sourceTopic) {
        try {
            Map<String, Object> dlqPayload = new LinkedHashMap<>();
            dlqPayload.put("error", errorMessage);
            dlqPayload.put("pipelineId", record.getPipelineId());
            dlqPayload.put("phaseName", record.getPhaseName());
            dlqPayload.put("phaseIndex", record.getPhaseIndex());
            dlqPayload.put("sourceTopic", sourceTopic);
            dlqPayload.put("failedAt", Instant.now().toString());
            dlqPayload.put("traceId", record.getTraceId());
            dlqPayload.put("originalData", record.getData());

            String json = objectMapper.writeValueAsString(dlqPayload);
            kafkaTemplate.send(properties.getDlqTopic(), record.getTraceId(), json);
            log.warn("Sent record to DLQ [trace={}]: {}", record.getTraceId(), errorMessage);
        } catch (Exception e) {
            log.error("Failed to send to DLQ: {}", e.getMessage());
        }
    }
}
