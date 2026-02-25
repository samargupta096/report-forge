package com.reportforge.pipeline.processor;

import com.reportforge.pipeline.config.PhaseDefinition;
import com.reportforge.pipeline.config.RuleDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Transforms records by applying data manipulation rules.
 *
 * <p>
 * Supported rule types:
 * <ul>
 * <li><b>CONCAT</b> — concatenate multiple source fields into a new field</li>
 * <li><b>ROUND</b> — round a numeric field to N decimal places</li>
 * <li><b>LOWERCASE</b> — convert field value to lowercase</li>
 * <li><b>UPPERCASE</b> — convert field value to uppercase</li>
 * <li><b>TRIM</b> — trim whitespace from field value</li>
 * <li><b>RENAME</b> — rename a field (copy value, remove old key)</li>
 * <li><b>DATE_FORMAT</b> — format a date/timestamp field</li>
 * </ul>
 */
@Component
public class TransformProcessor implements PhaseProcessor {

    private static final Logger log = LoggerFactory.getLogger(TransformProcessor.class);

    @Override
    public String getPhaseName() {
        return "transform";
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
            case "CONCAT": {
                List<String> sources = rule.getSources();
                String separator = rule.getSeparator() != null ? rule.getSeparator() : "";
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < sources.size(); i++) {
                    Object val = record.get(sources.get(i));
                    if (val != null) {
                        if (sb.length() > 0)
                            sb.append(separator);
                        sb.append(val);
                    }
                }
                record.put(field, sb.toString());
                break;
            }

            case "ROUND": {
                Object val = record.get(field);
                if (val != null) {
                    int decimals = rule.getDecimals() != null ? rule.getDecimals() : 2;
                    BigDecimal bd = new BigDecimal(val.toString())
                            .setScale(decimals, RoundingMode.HALF_UP);
                    record.put(field, bd.doubleValue());
                }
                break;
            }

            case "LOWERCASE": {
                Object val = record.get(field);
                if (val != null)
                    record.put(field, val.toString().toLowerCase());
                break;
            }

            case "UPPERCASE": {
                Object val = record.get(field);
                if (val != null)
                    record.put(field, val.toString().toUpperCase());
                break;
            }

            case "TRIM": {
                Object val = record.get(field);
                if (val != null)
                    record.put(field, val.toString().trim());
                break;
            }

            case "RENAME": {
                if (rule.getRenameTo() != null && record.containsKey(field)) {
                    record.put(rule.getRenameTo(), record.remove(field));
                }
                break;
            }

            case "DATE_FORMAT": {
                Object val = record.get(field);
                if (val != null && rule.getFormat() != null) {
                    try {
                        if (val instanceof Long) {
                            record.put(field, new SimpleDateFormat(rule.getFormat()).format(new Date((Long) val)));
                        } else {
                            record.put(field, new SimpleDateFormat(rule.getFormat()).format(new Date(val.toString())));
                        }
                    } catch (Exception e) {
                        log.warn("DATE_FORMAT failed for field '{}': {}", field, e.getMessage());
                    }
                }
                break;
            }

            default:
                log.warn("Unknown transform rule type: {}", type);
        }
    }
}
