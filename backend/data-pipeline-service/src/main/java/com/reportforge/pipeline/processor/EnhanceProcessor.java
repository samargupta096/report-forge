package com.reportforge.pipeline.processor;

import com.reportforge.pipeline.config.PhaseDefinition;
import com.reportforge.pipeline.config.RuleDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;

/**
 * Enhances records by adding derived or enriched fields.
 *
 * <p>
 * Supported rule types:
 * <ul>
 * <li><b>TIMESTAMP</b> — adds current ISO-8601 timestamp</li>
 * <li><b>DEFAULT_VALUE</b> — sets field to a default if missing or blank</li>
 * <li><b>LOOKUP</b> — looks up a value from a reference table (extensible)</li>
 * <li><b>COMPUTED</b> — sets a computed value from an expression
 * (placeholder)</li>
 * <li><b>COPY</b> — copies value from a source field to the target field</li>
 * </ul>
 */
@Component
public class EnhanceProcessor implements PhaseProcessor {

    private static final Logger log = LoggerFactory.getLogger(EnhanceProcessor.class);

    @Override
    public String getPhaseName() {
        return "enhance";
    }

    @Override
    public Map<String, Object> process(Map<String, Object> record, PhaseDefinition phase) {
        for (RuleDefinition rule : phase.getRules()) {
            applyRule(record, rule);
        }
        return record;
    }

    private void applyRule(Map<String, Object> record, RuleDefinition rule) {
        String field = rule.getField();
        String type = rule.getType().toUpperCase();

        switch (type) {
            case "TIMESTAMP":
                record.put(field, Instant.now().toString());
                break;

            case "DEFAULT_VALUE": {
                Object existing = record.get(field);
                if (existing == null || existing.toString().trim().isEmpty()) {
                    record.put(field, rule.getValue());
                }
                break;
            }

            case "LOOKUP": {
                // Extensible: currently supports simple in-memory lookup
                // In production, this would query a lookup table/service
                String sourceField = rule.getSourceField();
                Object sourceValue = record.get(sourceField);
                if (sourceValue != null) {
                    String lookupResult = performLookup(rule.getLookupTable(), sourceValue.toString());
                    if (lookupResult != null) {
                        record.put(field, lookupResult);
                    }
                }
                break;
            }

            case "COPY": {
                String sourceField = rule.getSourceField();
                if (sourceField != null && record.containsKey(sourceField)) {
                    record.put(field, record.get(sourceField));
                }
                break;
            }

            case "COMPUTED":
                // Placeholder for expression evaluation
                // Could integrate SpEL, MVEL, or a scripting engine
                if (rule.getExpression() != null) {
                    log.info(
                            "COMPUTED rule for '{}' — expression evaluation not yet implemented; setting expression as value",
                            field);
                    record.put(field, rule.getExpression());
                }
                break;

            default:
                log.warn("Unknown enhance rule type: {}", type);
        }
    }

    /**
     * Perform a lookup against a named table.
     * Override or inject a LookupService for production use.
     */
    private String performLookup(String tableName, String key) {
        // Extensible placeholder — in production this would query a cache/DB
        log.debug("Lookup: table={}, key={}", tableName, key);
        return null;
    }
}
