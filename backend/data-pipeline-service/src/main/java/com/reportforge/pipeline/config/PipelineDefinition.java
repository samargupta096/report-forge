package com.reportforge.pipeline.config;

import java.util.ArrayList;
import java.util.List;

/**
 * Defines a complete pipeline — a named sequence of phases.
 */
public class PipelineDefinition {
    private String description;
    private List<PhaseDefinition> phases = new ArrayList<>();

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<PhaseDefinition> getPhases() {
        return phases;
    }

    public void setPhases(List<PhaseDefinition> phases) {
        this.phases = phases;
    }

    @Override
    public String toString() {
        return "Pipeline{description='" + description + "', phases=" + phases.size() + "}";
    }
}
