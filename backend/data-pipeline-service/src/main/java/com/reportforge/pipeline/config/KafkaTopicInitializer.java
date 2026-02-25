package com.reportforge.pipeline.config;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.NewTopic;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaAdmin;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.*;

/**
 * Automatically creates all Kafka topics declared in pipeline definitions.
 *
 * <p>
 * Scans every pipeline's phases and creates:
 * <ul>
 * <li>Each unique {@code topicIn} and {@code topicOut}</li>
 * <li>The dead-letter queue topic</li>
 * </ul>
 */
@Component
public class KafkaTopicInitializer {

    private static final Logger log = LoggerFactory.getLogger(KafkaTopicInitializer.class);

    private final PipelineProperties properties;
    private final KafkaAdmin kafkaAdmin;

    public KafkaTopicInitializer(PipelineProperties properties, KafkaAdmin kafkaAdmin) {
        this.properties = properties;
        this.kafkaAdmin = kafkaAdmin;
    }

    @PostConstruct
    public void createTopics() {
        Set<String> topicNames = new LinkedHashSet<>();

        // Collect all topics from all pipelines
        properties.getDefinitions().forEach((pipelineName, definition) -> {
            definition.getPhases().forEach(phase -> {
                if (phase.getTopicIn() != null)
                    topicNames.add(phase.getTopicIn());
                if (phase.getTopicOut() != null)
                    topicNames.add(phase.getTopicOut());
            });
        });

        // Add DLQ topic
        topicNames.add(properties.getDlqTopic());

        log.info("Auto-creating {} Kafka topics: {}", topicNames.size(), topicNames);

        List<NewTopic> newTopics = new ArrayList<>();
        for (String name : topicNames) {
            newTopics.add(new NewTopic(name, 3, (short) 1));
        }

        try (AdminClient admin = AdminClient.create(kafkaAdmin.getConfigurationProperties())) {
            admin.createTopics(newTopics);
            log.info("Kafka topic creation request submitted");
        } catch (Exception e) {
            log.warn("Could not auto-create Kafka topics (they may already exist): {}", e.getMessage());
        }
    }
}
