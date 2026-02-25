package com.reportforge.pipeline.orchestrator;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reportforge.pipeline.config.PhaseDefinition;
import com.reportforge.pipeline.config.PipelineDefinition;
import com.reportforge.pipeline.config.PipelineProperties;
import com.reportforge.pipeline.model.PipelineRecord;
import com.reportforge.pipeline.processor.PhaseProcessor;
import com.reportforge.pipeline.processor.PhaseProcessorFactory;
import com.reportforge.pipeline.processor.ProcessingException;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;
import org.springframework.kafka.listener.ContainerProperties;
import org.springframework.kafka.listener.MessageListener;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Map;

/**
 * Core orchestrator — dynamically registers Kafka consumers for every
 * phase of every pipeline defined in configuration.
 *
 * <p>
 * For each phase, it:
 * <ol>
 * <li>Subscribes to the phase's {@code topicIn}</li>
 * <li>Deserializes the record</li>
 * <li>Routes it through the correct {@link PhaseProcessor}</li>
 * <li>Publishes the result to {@code topicOut} (or ingests if final phase)</li>
 * <li>On failure, routes to the dead-letter queue</li>
 * </ol>
 */
@Component
public class PipelineOrchestrator {

    private static final Logger log = LoggerFactory.getLogger(PipelineOrchestrator.class);

    private final PipelineProperties properties;
    private final PhaseProcessorFactory processorFactory;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ConcurrentKafkaListenerContainerFactory<String, String> containerFactory;
    private final DeadLetterHandler deadLetterHandler;
    private final ObjectMapper objectMapper;

    public PipelineOrchestrator(PipelineProperties properties,
            PhaseProcessorFactory processorFactory,
            KafkaTemplate<String, String> kafkaTemplate,
            ConcurrentKafkaListenerContainerFactory<String, String> containerFactory,
            DeadLetterHandler deadLetterHandler,
            ObjectMapper objectMapper) {
        this.properties = properties;
        this.processorFactory = processorFactory;
        this.kafkaTemplate = kafkaTemplate;
        this.containerFactory = containerFactory;
        this.deadLetterHandler = deadLetterHandler;
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    public void start() {
        properties.getDefinitions().forEach(this::registerPipeline);
    }

    private void registerPipeline(String pipelineId, PipelineDefinition definition) {
        log.info("Registering pipeline '{}': {} phases", pipelineId, definition.getPhases().size());

        for (int i = 0; i < definition.getPhases().size(); i++) {
            PhaseDefinition phase = definition.getPhases().get(i);
            registerPhaseListener(pipelineId, i, phase);
        }
    }

    private void registerPhaseListener(String pipelineId, int phaseIndex, PhaseDefinition phase) {
        String topicIn = phase.getTopicIn();
        if (topicIn == null) {
            log.warn("Pipeline '{}' phase '{}' has no topicIn — skipping", pipelineId, phase.getName());
            return;
        }

        PhaseProcessor processor = processorFactory.getProcessor(phase.getName());
        if (processor == null) {
            log.error("No processor found for phase '{}' — skipping", phase.getName());
            return;
        }

        log.info("  Phase [{}] '{}': {} → {}",
                phaseIndex, phase.getName(), topicIn, phase.getTopicOut() != null ? phase.getTopicOut() : "(ingest)");

        // Create a dynamic Kafka listener container
        ContainerProperties containerProps = new ContainerProperties(topicIn);
        containerProps.setGroupId("pipeline-" + pipelineId + "-" + phase.getName());

        containerProps.setMessageListener((MessageListener<String, String>) record -> handleMessage(record, pipelineId,
                phaseIndex, phase, processor));

        ConcurrentMessageListenerContainer<String, String> container = new ConcurrentMessageListenerContainer<>(
                containerFactory.getConsumerFactory(), containerProps);
        container.setConcurrency(1);
        container.start();
    }

    private void handleMessage(ConsumerRecord<String, String> record,
            String pipelineId, int phaseIndex,
            PhaseDefinition phase, PhaseProcessor processor) {
        PipelineRecord pipelineRecord = null;
        try {
            // Deserialize the message
            Map<String, Object> data = objectMapper.readValue(
                    record.value(), new TypeReference<Map<String, Object>>() {
                    });

            pipelineRecord = new PipelineRecord(pipelineId, phaseIndex, phase.getName(), data);
            log.debug("Processing: {}", pipelineRecord);

            // Execute the phase processor
            Map<String, Object> result = processor.process(data, phase);

            // Publish to next topic (if not the final ingest phase)
            if (phase.getTopicOut() != null) {
                String json = objectMapper.writeValueAsString(result);
                kafkaTemplate.send(phase.getTopicOut(), record.key(), json);
                log.debug("Published to '{}': key={}", phase.getTopicOut(), record.key());
            }

        } catch (ProcessingException e) {
            log.warn("Processing failed at phase '{}': {}", phase.getName(), e.getMessage());
            if (pipelineRecord != null) {
                deadLetterHandler.sendToDeadLetter(pipelineRecord, e.getMessage(), record.topic());
            }
        } catch (Exception e) {
            log.error("Unexpected error in pipeline '{}' phase '{}': {}",
                    pipelineId, phase.getName(), e.getMessage());
            if (pipelineRecord != null) {
                deadLetterHandler.sendToDeadLetter(pipelineRecord, e.getMessage(), record.topic());
            }
        }
    }
}
