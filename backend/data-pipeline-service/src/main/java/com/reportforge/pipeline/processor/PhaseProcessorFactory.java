package com.reportforge.pipeline.processor;

import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Factory that maps phase names to their processor implementations.
 *
 * <p>
 * Auto-discovers all {@link PhaseProcessor} beans and registers them
 * by their {@code getPhaseName()} value. This makes the system extensible —
 * to add a new phase type, simply create a new {@link PhaseProcessor} bean.
 */
@Component
public class PhaseProcessorFactory {

    private final List<PhaseProcessor> processors;
    private final Map<String, PhaseProcessor> registry = new HashMap<>();

    public PhaseProcessorFactory(List<PhaseProcessor> processors) {
        this.processors = processors;
    }

    @PostConstruct
    public void init() {
        for (PhaseProcessor processor : processors) {
            registry.put(processor.getPhaseName().toLowerCase(), processor);
        }
    }

    /**
     * Get the processor for a phase name.
     *
     * @param phaseName e.g. "validate", "transform", "enhance", "ingest"
     * @return the processor, or null if not found
     */
    public PhaseProcessor getProcessor(String phaseName) {
        return registry.get(phaseName.toLowerCase());
    }

    /**
     * Check if a processor exists for a phase name.
     */
    public boolean hasProcessor(String phaseName) {
        return registry.containsKey(phaseName.toLowerCase());
    }
}
