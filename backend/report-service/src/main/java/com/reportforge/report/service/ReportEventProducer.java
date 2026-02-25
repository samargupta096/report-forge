package com.reportforge.report.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reportforge.report.config.KafkaTopicConfig;
import com.reportforge.report.event.ReportExecutionEvent;
import com.reportforge.report.event.ReportResultEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

/**
 * Publishes report pipeline events to Kafka topics.
 *
 * <p>
 * This producer is used by controllers to asynchronously trigger
 * report execution via the data pipeline instead of executing inline.
 */
@Service
public class ReportEventProducer {

    private static final Logger log = LoggerFactory.getLogger(ReportEventProducer.class);
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public ReportEventProducer(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    /**
     * Publish a report execution request to the pipeline.
     */
    public void publishExecutionRequest(ReportExecutionEvent event) {
        String json = toJson(event);
        log.info("Publishing execution event: {}", event);
        kafkaTemplate.send(KafkaTopicConfig.TOPIC_REPORT_EXECUTE, String.valueOf(event.getTemplateId()), json);
    }

    /**
     * Publish a report execution result.
     */
    public void publishResult(ReportResultEvent event) {
        String json = toJson(event);
        log.info("Publishing result event: {}", event);
        kafkaTemplate.send(KafkaTopicConfig.TOPIC_REPORT_RESULT, String.valueOf(event.getTemplateId()), json);
    }

    private String toJson(Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize event to JSON", e);
        }
    }
}
