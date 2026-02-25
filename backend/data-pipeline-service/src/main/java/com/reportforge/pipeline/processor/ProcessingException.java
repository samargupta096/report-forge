package com.reportforge.pipeline.processor;

/**
 * Thrown when a record fails processing in a phase.
 * Contains error details for routing to the dead-letter queue.
 */
public class ProcessingException extends RuntimeException {
    private final String phaseName;
    private final String ruleName;

    public ProcessingException(String phaseName, String ruleName, String message) {
        super(message);
        this.phaseName = phaseName;
        this.ruleName = ruleName;
    }

    public String getPhaseName() {
        return phaseName;
    }

    public String getRuleName() {
        return ruleName;
    }
}
