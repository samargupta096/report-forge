package com.reportforge.pipeline.config;

import java.util.List;
import java.util.Map;

/**
 * A single rule within a pipeline phase.
 *
 * <p>
 * Rules define what operation to perform on a field. The {@code type}
 * determines the behaviour, and additional properties configure it.
 *
 * <p>
 * Validation types: REQUIRED, NOT_BLANK, NUMERIC, REGEX, MIN, MAX
 * <p>
 * Transform types: CONCAT, ROUND, LOWERCASE, UPPERCASE, RENAME, DATE_FORMAT,
 * TRIM
 * <p>
 * Enhance types: LOOKUP, TIMESTAMP, DEFAULT_VALUE, COMPUTED
 */
public class RuleDefinition {
    /** Target field name */
    private String field;

    /** Rule type (e.g. NOT_BLANK, CONCAT, LOOKUP) */
    private String type;

    // --- Validation params ---
    private Double min;
    private Double max;
    private String pattern; // for REGEX

    // --- Transform params ---
    private List<String> sources; // for CONCAT
    private String separator; // for CONCAT
    private Integer decimals; // for ROUND
    private String format; // for DATE_FORMAT
    private String renameTo; // for RENAME

    // --- Enhance params ---
    private String sourceField; // for LOOKUP
    private String lookupTable; // for LOOKUP
    private String value; // for DEFAULT_VALUE
    private String expression; // for COMPUTED

    // --- Extra ---
    private Map<String, String> params; // generic extensible params

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getMin() {
        return min;
    }

    public void setMin(Double min) {
        this.min = min;
    }

    public Double getMax() {
        return max;
    }

    public void setMax(Double max) {
        this.max = max;
    }

    public String getPattern() {
        return pattern;
    }

    public void setPattern(String pattern) {
        this.pattern = pattern;
    }

    public List<String> getSources() {
        return sources;
    }

    public void setSources(List<String> sources) {
        this.sources = sources;
    }

    public String getSeparator() {
        return separator;
    }

    public void setSeparator(String separator) {
        this.separator = separator;
    }

    public Integer getDecimals() {
        return decimals;
    }

    public void setDecimals(Integer decimals) {
        this.decimals = decimals;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public String getRenameTo() {
        return renameTo;
    }

    public void setRenameTo(String renameTo) {
        this.renameTo = renameTo;
    }

    public String getSourceField() {
        return sourceField;
    }

    public void setSourceField(String sourceField) {
        this.sourceField = sourceField;
    }

    public String getLookupTable() {
        return lookupTable;
    }

    public void setLookupTable(String lookupTable) {
        this.lookupTable = lookupTable;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getExpression() {
        return expression;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public Map<String, String> getParams() {
        return params;
    }

    public void setParams(Map<String, String> params) {
        this.params = params;
    }

    @Override
    public String toString() {
        return "Rule{field='" + field + "', type='" + type + "'}";
    }
}
