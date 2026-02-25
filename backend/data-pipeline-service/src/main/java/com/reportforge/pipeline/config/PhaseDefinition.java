package com.reportforge.pipeline.config;

import java.util.ArrayList;
import java.util.List;

/**
 * Defines a single phase in a pipeline (validate, transform, enhance, or
 * ingest).
 *
 * <p>
 * Each phase reads from {@code topicIn}, processes the data using
 * {@code rules},
 * and publishes the result to {@code topicOut}. The ingest phase uses a
 * {@link IngestTarget} instead of rules.
 */
public class PhaseDefinition {
    /** Phase name: validate, transform, enhance, ingest */
    private String name;

    /** Kafka topic to consume from */
    private String topicIn;

    /** Kafka topic to publish to (not used for ingest) */
    private String topicOut;

    /** Rules to apply in this phase */
    private List<RuleDefinition> rules = new ArrayList<>();

    /** Target configuration (ingest phase only) */
    private IngestTarget target;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTopicIn() {
        return topicIn;
    }

    public void setTopicIn(String topicIn) {
        this.topicIn = topicIn;
    }

    public String getTopicOut() {
        return topicOut;
    }

    public void setTopicOut(String topicOut) {
        this.topicOut = topicOut;
    }

    public List<RuleDefinition> getRules() {
        return rules;
    }

    public void setRules(List<RuleDefinition> rules) {
        this.rules = rules;
    }

    public IngestTarget getTarget() {
        return target;
    }

    public void setTarget(IngestTarget target) {
        this.target = target;
    }

    @Override
    public String toString() {
        return "Phase{name='" + name + "', topicIn='" + topicIn + "', topicOut='" + topicOut + "'}";
    }
}
