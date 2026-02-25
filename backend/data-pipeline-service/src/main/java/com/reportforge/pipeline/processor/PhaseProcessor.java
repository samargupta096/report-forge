package com.reportforge.pipeline.processor;

import com.reportforge.pipeline.config.PhaseDefinition;

import java.util.Map;

/**
 * Contract for a pipeline phase processor.
 *
 * <p>
 * Each implementation handles one phase type (validate, transform, enhance,
 * ingest).
 * Processors are stateless and thread-safe.
 *
 * @see ValidateProcessor
 * @see TransformProcessor
 * @see EnhanceProcessor
 * @see IngestProcessor
 */
public interface PhaseProcessor {

    /**
     * Process a single record through this phase.
     *
     * @param record the data record as a mutable map
     * @param phase  the phase definition (contains rules/target)
     * @return the processed record (may be modified in place)
     * @throws ProcessingException if the record fails this phase
     */
    Map<String, Object> process(Map<String, Object> record, PhaseDefinition phase);

    /**
     * @return the phase name this processor handles (e.g. "validate")
     */
    String getPhaseName();
}
