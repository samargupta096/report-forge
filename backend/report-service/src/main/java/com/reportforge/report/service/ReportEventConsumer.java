package com.reportforge.report.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reportforge.report.config.KafkaTopicConfig;
import com.reportforge.report.event.ReportExecutionEvent;
import com.reportforge.report.event.ReportResultEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Kafka consumer that processes report execution requests from the pipeline.
 *
 * <p>
 * Flow:
 * <ol>
 * <li>Reads a {@link ReportExecutionEvent} from {@code report.execute}
 * topic</li>
 * <li>Runs the SQL against the named datasource via
 * {@link QueryExecutionService}</li>
 * <li>Publishes a {@link ReportResultEvent} to {@code report.result} topic</li>
 * </ol>
 */
@Service
public class ReportEventConsumer {

    private static final Logger log = LoggerFactory.getLogger(ReportEventConsumer.class);

    private final QueryExecutionService queryExecutionService;
    private final ReportEventProducer eventProducer;
    private final ObjectMapper objectMapper;

    public ReportEventConsumer(QueryExecutionService queryExecutionService,
            ReportEventProducer eventProducer,
            ObjectMapper objectMapper) {
        this.queryExecutionService = queryExecutionService;
        this.eventProducer = eventProducer;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = KafkaTopicConfig.TOPIC_REPORT_EXECUTE, groupId = "report-execution-group")
    public void onExecutionRequest(String message) {
        ReportExecutionEvent event;
        try {
            event = objectMapper.readValue(message, ReportExecutionEvent.class);
        } catch (Exception e) {
            log.error("Failed to parse execution event: {}", e.getMessage());
            return;
        }

        log.info("Received execution request: {}", event);

        try {
            List<Map<String, Object>> results = queryExecutionService.execute(
                    event.getDataSourceName(),
                    event.getSql());
            ReportResultEvent result = ReportResultEvent.success(event.getTemplateId(), results);
            eventProducer.publishResult(result);
            log.info("Report execution succeeded for template {}: {} rows", event.getTemplateId(), results.size());
        } catch (Exception e) {
            log.error("Report execution failed for template {}: {}", event.getTemplateId(), e.getMessage());
            ReportResultEvent result = ReportResultEvent.failure(event.getTemplateId(), e.getMessage());
            eventProducer.publishResult(result);
        }
    }
}
