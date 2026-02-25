package com.reportforge.dashboard.model;

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
 * Dashboard
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", comments = "Generator version: 7.20.0")
public class Dashboard {

  private @Nullable String id;

  private @Nullable String name;

  private @Nullable String description;

  private @Nullable Integer ownerId;

  private @Nullable Object layout;

  @Valid
  private List<Object> widgets = new ArrayList<>();

  public Dashboard id(@Nullable String id) {
    this.id = id;
    return this;
  }

  /**
   * Get id
   * @return id
   */
  
  @Schema(name = "id", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("id")
  public @Nullable String getId() {
    return id;
  }

  public void setId(@Nullable String id) {
    this.id = id;
  }

  public Dashboard name(@Nullable String name) {
    this.name = name;
    return this;
  }

  /**
   * Get name
   * @return name
   */
  
  @Schema(name = "name", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("name")
  public @Nullable String getName() {
    return name;
  }

  public void setName(@Nullable String name) {
    this.name = name;
  }

  public Dashboard description(@Nullable String description) {
    this.description = description;
    return this;
  }

  /**
   * Get description
   * @return description
   */
  
  @Schema(name = "description", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("description")
  public @Nullable String getDescription() {
    return description;
  }

  public void setDescription(@Nullable String description) {
    this.description = description;
  }

  public Dashboard ownerId(@Nullable Integer ownerId) {
    this.ownerId = ownerId;
    return this;
  }

  /**
   * Get ownerId
   * @return ownerId
   */
  
  @Schema(name = "ownerId", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("ownerId")
  public @Nullable Integer getOwnerId() {
    return ownerId;
  }

  public void setOwnerId(@Nullable Integer ownerId) {
    this.ownerId = ownerId;
  }

  public Dashboard layout(@Nullable Object layout) {
    this.layout = layout;
    return this;
  }

  /**
   * JSON representing the UI layout structure
   * @return layout
   */
  
  @Schema(name = "layout", description = "JSON representing the UI layout structure", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("layout")
  public @Nullable Object getLayout() {
    return layout;
  }

  public void setLayout(@Nullable Object layout) {
    this.layout = layout;
  }

  public Dashboard widgets(List<Object> widgets) {
    this.widgets = widgets;
    return this;
  }

  public Dashboard addWidgetsItem(Object widgetsItem) {
    if (this.widgets == null) {
      this.widgets = new ArrayList<>();
    }
    this.widgets.add(widgetsItem);
    return this;
  }

  /**
   * Get widgets
   * @return widgets
   */
  
  @Schema(name = "widgets", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("widgets")
  public List<Object> getWidgets() {
    return widgets;
  }

  public void setWidgets(List<Object> widgets) {
    this.widgets = widgets;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Dashboard dashboard = (Dashboard) o;
    return Objects.equals(this.id, dashboard.id) &&
        Objects.equals(this.name, dashboard.name) &&
        Objects.equals(this.description, dashboard.description) &&
        Objects.equals(this.ownerId, dashboard.ownerId) &&
        Objects.equals(this.layout, dashboard.layout) &&
        Objects.equals(this.widgets, dashboard.widgets);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, description, ownerId, layout, widgets);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Dashboard {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    ownerId: ").append(toIndentedString(ownerId)).append("\n");
    sb.append("    layout: ").append(toIndentedString(layout)).append("\n");
    sb.append("    widgets: ").append(toIndentedString(widgets)).append("\n");
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

