package com.reportforge.pipeline.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Root configuration binding for all pipeline definitions.
 *
 * <p>
 * Reads from {@code pipeline} in application.yml:
 * 
 * <pre>
 * pipeline:
 *   dlq-topic: pipeline.dlq
 *   definitions:
 *     my-pipeline:
 *       description: ...
 *       phases: [...]
 * </pre>
 *
 * <p>
 * Adding a new pipeline is purely config — no code changes needed.
 */
@Component
@ConfigurationProperties(prefix = "pipeline")
public class PipelineProperties {

    /** Dead letter queue topic for failed records */
    private String dlqTopic = "pipeline.dlq";

    /** Map of pipeline-name → pipeline-definition */
    private Map<String, PipelineDefinition> definitions = new HashMap<>();

    public String getDlqTopic() {
        return dlqTopic;
    }

    public void setDlqTopic(String dlqTopic) {
        this.dlqTopic = dlqTopic;
    }

    public Map<String, PipelineDefinition> getDefinitions() {
        return definitions;
    }

    public void setDefinitions(Map<String, PipelineDefinition> definitions) {
        this.definitions = definitions;
    }
}
