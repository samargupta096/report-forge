package com.reportforge.pipeline.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reportforge.pipeline.config.PipelineDefinition;
import com.reportforge.pipeline.config.PipelineProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * REST API for managing and triggering pipelines.
 *
 * <ul>
 * <li>GET /pipelines — list all configured pipelines</li>
 * <li>GET /pipelines/{id} — get pipeline details</li>
 * <li>POST /pipelines/{id}/trigger — inject a record into the pipeline</li>
 * </ul>
 */
@RestController
@RequestMapping("/api/v1/pipelines")
public class PipelineController {

    private static final Logger log = LoggerFactory.getLogger(PipelineController.class);

    private final PipelineProperties properties;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public PipelineController(PipelineProperties properties,
            KafkaTemplate<String, String> kafkaTemplate,
            ObjectMapper objectMapper) {
        this.properties = properties;
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    /**
     * List all configured pipelines with phase summaries.
     */
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> listPipelines() {
        List<Map<String, Object>> result = new ArrayList<>();
        properties.getDefinitions().forEach((id, def) -> {
            Map<String, Object> summary = new LinkedHashMap<>();
            summary.put("id", id);
            summary.put("description", def.getDescription());
            summary.put("phaseCount", def.getPhases().size());
            List<String> phaseNames = new ArrayList<>();
            def.getPhases().forEach(p -> phaseNames.add(p.getName()));
            summary.put("phases", phaseNames);
            if (!def.getPhases().isEmpty()) {
                summary.put("entryTopic", def.getPhases().get(0).getTopicIn());
            }
            result.add(summary);
        });
        return ResponseEntity.ok(result);
    }

    /**
     * Get detailed configuration for a specific pipeline.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Object> getPipeline(@PathVariable String id) {
        PipelineDefinition definition = properties.getDefinitions().get(id);
        if (definition == null) {
            return ResponseEntity.notFound().build();
        }
        Map<String, Object> detail = new LinkedHashMap<>();
        detail.put("id", id);
        detail.put("description", definition.getDescription());
        detail.put("phases", definition.getPhases());
        return ResponseEntity.ok(detail);
    }

    /**
     * Trigger a pipeline by publishing a record to its first phase's input topic.
     *
     * <p>
     * Request body should be the raw data JSON:
     * 
     * <pre>
     * {
     *   "email": "john@example.com",
     *   "first_name": "John",
     *   "last_name": "Doe",
     *   "amount": 99.999
     * }
     * </pre>
     */
    @PostMapping("/{id}/trigger")
    public ResponseEntity<Map<String, String>> triggerPipeline(
            @PathVariable String id,
            @RequestBody Map<String, Object> data) {

        PipelineDefinition definition = properties.getDefinitions().get(id);
        if (definition == null) {
            return ResponseEntity.notFound().build();
        }
        if (definition.getPhases().isEmpty()) {
            return ResponseEntity.badRequest().body(
                    Collections.singletonMap("error", "Pipeline has no phases"));
        }

        String entryTopic = definition.getPhases().get(0).getTopicIn();
        String traceId = UUID.randomUUID().toString().substring(0, 8);

        try {
            String json = objectMapper.writeValueAsString(data);
            kafkaTemplate.send(entryTopic, traceId, json);
            log.info("Triggered pipeline '{}' with trace={}", id, traceId);

            Map<String, String> response = new LinkedHashMap<>();
            response.put("status", "ACCEPTED");
            response.put("pipelineId", id);
            response.put("traceId", traceId);
            response.put("entryTopic", entryTopic);
            return ResponseEntity.accepted().body(response);

        } catch (Exception e) {
            log.error("Failed to trigger pipeline '{}': {}", id, e.getMessage());
            return ResponseEntity.internalServerError().body(
                    Collections.singletonMap("error", e.getMessage()));
        }
    }
}
