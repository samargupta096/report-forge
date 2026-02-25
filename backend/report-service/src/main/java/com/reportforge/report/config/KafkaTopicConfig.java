package com.reportforge.report.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

/**
 * Kafka topic configuration.
 * Defines topics used in the report data pipeline.
 */
@Configuration
public class KafkaTopicConfig {

    /** Topic for report execution requests */
    public static final String TOPIC_REPORT_EXECUTE = "report.execute";

    /** Topic for report execution results/completions */
    public static final String TOPIC_REPORT_RESULT = "report.result";

    /** Topic for report schedule triggers */
    public static final String TOPIC_REPORT_SCHEDULE = "report.schedule";

    @Bean
    public NewTopic reportExecuteTopic() {
        return TopicBuilder.name(TOPIC_REPORT_EXECUTE)
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic reportResultTopic() {
        return TopicBuilder.name(TOPIC_REPORT_RESULT)
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic reportScheduleTopic() {
        return TopicBuilder.name(TOPIC_REPORT_SCHEDULE)
                .partitions(1)
                .replicas(1)
                .build();
    }
}
