package com.reportforge.datasource.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import org.springframework.lang.Nullable;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * DataSourceRequest
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", comments = "Generator version: 7.20.0")
public class DataSourceRequest {

  private String name;

  /**
   * Gets or Sets type
   */
  public enum TypeEnum {
    POSTGRES("POSTGRES"),
    
    MYSQL("MYSQL"),
    
    MONGODB("MONGODB"),
    
    SQLSERVER("SQLSERVER"),
    
    ELASTICSEARCH("ELASTICSEARCH");

    private final String value;

    TypeEnum(String value) {
      this.value = value;
    }

    @JsonValue
    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static TypeEnum fromValue(String value) {
      for (TypeEnum b : TypeEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
  }

  private TypeEnum type;

  private String url;

  private @Nullable String username;

  private @Nullable String password;

  public DataSourceRequest() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public DataSourceRequest(String name, TypeEnum type, String url) {
    this.name = name;
    this.type = type;
    this.url = url;
  }

  public DataSourceRequest name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Get name
   * @return name
   */
  @NotNull 
  @Schema(name = "name", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("name")
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public DataSourceRequest type(TypeEnum type) {
    this.type = type;
    return this;
  }

  /**
   * Get type
   * @return type
   */
  @NotNull 
  @Schema(name = "type", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("type")
  public TypeEnum getType() {
    return type;
  }

  public void setType(TypeEnum type) {
    this.type = type;
  }

  public DataSourceRequest url(String url) {
    this.url = url;
    return this;
  }

  /**
   * Get url
   * @return url
   */
  @NotNull 
  @Schema(name = "url", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("url")
  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public DataSourceRequest username(@Nullable String username) {
    this.username = username;
    return this;
  }

  /**
   * Get username
   * @return username
   */
  
  @Schema(name = "username", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("username")
  public @Nullable String getUsername() {
    return username;
  }

  public void setUsername(@Nullable String username) {
    this.username = username;
  }

  public DataSourceRequest password(@Nullable String password) {
    this.password = password;
    return this;
  }

  /**
   * Get password
   * @return password
   */
  
  @Schema(name = "password", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("password")
  public @Nullable String getPassword() {
    return password;
  }

  public void setPassword(@Nullable String password) {
    this.password = password;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DataSourceRequest dataSourceRequest = (DataSourceRequest) o;
    return Objects.equals(this.name, dataSourceRequest.name) &&
        Objects.equals(this.type, dataSourceRequest.type) &&
        Objects.equals(this.url, dataSourceRequest.url) &&
        Objects.equals(this.username, dataSourceRequest.username) &&
        Objects.equals(this.password, dataSourceRequest.password);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, type, url, username, password);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DataSourceRequest {\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    url: ").append(toIndentedString(url)).append("\n");
    sb.append("    username: ").append(toIndentedString(username)).append("\n");
    sb.append("    password: ").append(toIndentedString(password)).append("\n");
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

