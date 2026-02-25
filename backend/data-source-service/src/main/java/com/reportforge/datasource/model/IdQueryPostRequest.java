package com.reportforge.datasource.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import org.springframework.lang.Nullable;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * IdQueryPostRequest
 */

@JsonTypeName("__id__query_post_request")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", comments = "Generator version: 7.20.0")
public class IdQueryPostRequest {

  private @Nullable String sql;

  public IdQueryPostRequest sql(@Nullable String sql) {
    this.sql = sql;
    return this;
  }

  /**
   * Get sql
   * @return sql
   */
  
  @Schema(name = "sql", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("sql")
  public @Nullable String getSql() {
    return sql;
  }

  public void setSql(@Nullable String sql) {
    this.sql = sql;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    IdQueryPostRequest idQueryPostRequest = (IdQueryPostRequest) o;
    return Objects.equals(this.sql, idQueryPostRequest.sql);
  }

  @Override
  public int hashCode() {
    return Objects.hash(sql);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class IdQueryPostRequest {\n");
    sb.append("    sql: ").append(toIndentedString(sql)).append("\n");
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

