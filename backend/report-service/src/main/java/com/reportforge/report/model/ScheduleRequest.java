package com.reportforge.report.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.lang.Nullable;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * ScheduleRequest
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", comments = "Generator version: 7.20.0")
public class ScheduleRequest {

  private Integer reportId;

  private String cronExpression;

  @Valid
  private List<String> emails = new ArrayList<>();

  public ScheduleRequest() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public ScheduleRequest(Integer reportId, String cronExpression) {
    this.reportId = reportId;
    this.cronExpression = cronExpression;
  }

  public ScheduleRequest reportId(Integer reportId) {
    this.reportId = reportId;
    return this;
  }

  /**
   * Get reportId
   * @return reportId
   */
  @NotNull 
  @Schema(name = "reportId", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("reportId")
  public Integer getReportId() {
    return reportId;
  }

  public void setReportId(Integer reportId) {
    this.reportId = reportId;
  }

  public ScheduleRequest cronExpression(String cronExpression) {
    this.cronExpression = cronExpression;
    return this;
  }

  /**
   * Get cronExpression
   * @return cronExpression
   */
  @NotNull 
  @Schema(name = "cronExpression", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("cronExpression")
  public String getCronExpression() {
    return cronExpression;
  }

  public void setCronExpression(String cronExpression) {
    this.cronExpression = cronExpression;
  }

  public ScheduleRequest emails(List<String> emails) {
    this.emails = emails;
    return this;
  }

  public ScheduleRequest addEmailsItem(String emailsItem) {
    if (this.emails == null) {
      this.emails = new ArrayList<>();
    }
    this.emails.add(emailsItem);
    return this;
  }

  /**
   * Get emails
   * @return emails
   */
  
  @Schema(name = "emails", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("emails")
  public List<String> getEmails() {
    return emails;
  }

  public void setEmails(List<String> emails) {
    this.emails = emails;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ScheduleRequest scheduleRequest = (ScheduleRequest) o;
    return Objects.equals(this.reportId, scheduleRequest.reportId) &&
        Objects.equals(this.cronExpression, scheduleRequest.cronExpression) &&
        Objects.equals(this.emails, scheduleRequest.emails);
  }

  @Override
  public int hashCode() {
    return Objects.hash(reportId, cronExpression, emails);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ScheduleRequest {\n");
    sb.append("    reportId: ").append(toIndentedString(reportId)).append("\n");
    sb.append("    cronExpression: ").append(toIndentedString(cronExpression)).append("\n");
    sb.append("    emails: ").append(toIndentedString(emails)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(@Nullable Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

