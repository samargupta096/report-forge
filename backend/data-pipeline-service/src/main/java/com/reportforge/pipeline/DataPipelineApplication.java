package com.reportforge.pipeline;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Generic Data Pipeline Service.
 *
 * <p>
 * Processes data through configurable phases (validate → transform → enhance →
 * ingest),
 * each backed by its own Kafka topic. Pipeline definitions and rules are
 * entirely YAML-driven — no code changes needed to add new pipelines.
 */
@SpringBootApplication
public class DataPipelineApplication {
    public static void main(String[] args) {
        SpringApplication.run(DataPipelineApplication.class, args);
    }
}
