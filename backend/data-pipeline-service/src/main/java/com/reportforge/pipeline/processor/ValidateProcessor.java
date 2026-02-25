package com.reportforge.pipeline.processor;

import com.reportforge.pipeline.config.PhaseDefinition;
import com.reportforge.pipeline.config.RuleDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Validates records against configured rules.
 *
 * <p>
 * Supported rule types:
 * <ul>
 * <li><b>REQUIRED</b> — field must exist</li>
 * <li><b>NOT_BLANK</b> — field must exist and be non-empty</li>
 * <li><b>NUMERIC</b> — field must be a number, with optional min/max</li>
 * <li><b>REGEX</b> — field value must match the pattern</li>
 * <li><b>MIN</b> — numeric field must be >= min</li>
 * <li><b>MAX</b> — numeric field must be <= max</li>
 * </ul>
 */
@Component
public class ValidateProcessor implements PhaseProcessor {

    private static final Logger log = LoggerFactory.getLogger(ValidateProcessor.class);

    @Override
    public String getPhaseName() {
        return "validate";
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
        Object value = record.get(field);
        String type = rule.getType().toUpperCase();

        switch (type) {
            case "REQUIRED":
                if (value == null) {
                    throw new ProcessingException("validate", type,
                            "Field '" + field + "' is required but missing");
                }
                break;

            case "NOT_BLANK":
                if (value == null || value.toString().trim().isEmpty()) {
                    throw new ProcessingException("validate", type,
                            "Field '" + field + "' must not be blank");
                }
                break;

            case "NUMERIC":
                if (value != null) {
                    try {
                        double num = Double.parseDouble(value.toString());
                        if (rule.getMin() != null && num < rule.getMin()) {
                            throw new ProcessingException("validate", type,
                                    "Field '" + field + "' value " + num + " < min " + rule.getMin());
                        }
                        if (rule.getMax() != null && num > rule.getMax()) {
                            throw new ProcessingException("validate", type,
                                    "Field '" + field + "' value " + num + " > max " + rule.getMax());
                        }
                    } catch (NumberFormatException e) {
                        throw new ProcessingException("validate", type,
                                "Field '" + field + "' is not numeric: " + value);
                    }
                }
                break;

            case "REGEX":
                if (value != null && rule.getPattern() != null) {
                    if (!value.toString().matches(rule.getPattern())) {
                        throw new ProcessingException("validate", type,
                                "Field '" + field + "' does not match pattern: " + rule.getPattern());
                    }
                }
                break;

            default:
                log.warn("Unknown validation rule type: {}", type);
        }
    }
}
