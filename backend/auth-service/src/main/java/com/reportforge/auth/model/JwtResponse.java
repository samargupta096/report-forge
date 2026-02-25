package com.reportforge.auth.model;

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
 * JwtResponse
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", comments = "Generator version: 7.20.0")
public class JwtResponse {

  private @Nullable String token;

  private @Nullable String type;

  private @Nullable Long id;

  private @Nullable String username;

  @Valid
  private List<String> roles = new ArrayList<>();

  public JwtResponse token(@Nullable String token) {
    this.token = token;
    return this;
  }

  /**
   * Get token
   * @return token
   */
  
  @Schema(name = "token", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("token")
  public @Nullable String getToken() {
    return token;
  }

  public void setToken(@Nullable String token) {
    this.token = token;
  }

  public JwtResponse type(@Nullable String type) {
    this.type = type;
    return this;
  }

  /**
   * Get type
   * @return type
   */
  
  @Schema(name = "type", example = "Bearer", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("type")
  public @Nullable String getType() {
    return type;
  }

  public void setType(@Nullable String type) {
    this.type = type;
  }

  public JwtResponse id(@Nullable Long id) {
    this.id = id;
    return this;
  }

  /**
   * Get id
   * @return id
   */
  
  @Schema(name = "id", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("id")
  public @Nullable Long getId() {
    return id;
  }

  public void setId(@Nullable Long id) {
    this.id = id;
  }

  public JwtResponse username(@Nullable String username) {
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

  public JwtResponse roles(List<String> roles) {
    this.roles = roles;
    return this;
  }

  public JwtResponse addRolesItem(String rolesItem) {
    if (this.roles == null) {
      this.roles = new ArrayList<>();
    }
    this.roles.add(rolesItem);
    return this;
  }

  /**
   * Get roles
   * @return roles
   */
  
  @Schema(name = "roles", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("roles")
  public List<String> getRoles() {
    return roles;
  }

  public void setRoles(List<String> roles) {
    this.roles = roles;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    JwtResponse jwtResponse = (JwtResponse) o;
    return Objects.equals(this.token, jwtResponse.token) &&
        Objects.equals(this.type, jwtResponse.type) &&
        Objects.equals(this.id, jwtResponse.id) &&
        Objects.equals(this.username, jwtResponse.username) &&
        Objects.equals(this.roles, jwtResponse.roles);
  }

  @Override
  public int hashCode() {
    return Objects.hash(token, type, id, username, roles);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class JwtResponse {\n");
    sb.append("    token: ").append(toIndentedString(token)).append("\n");
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    username: ").append(toIndentedString(username)).append("\n");
    sb.append("    roles: ").append(toIndentedString(roles)).append("\n");
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

