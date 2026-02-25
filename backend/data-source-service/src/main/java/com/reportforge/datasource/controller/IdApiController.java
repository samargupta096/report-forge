package com.reportforge.datasource.controller;

import com.reportforge.datasource.model.IdQueryPostRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.context.request.NativeWebRequest;

import javax.validation.constraints.*;
import javax.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.annotation.Generated;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", comments = "Generator version: 7.20.0")
@Controller
@RequestMapping("${openapi.dataSourceService.base-path:/api/v1/data-sources}")
public class IdApiController implements IdApi {

    private final NativeWebRequest request;
    private final com.reportforge.datasource.repository.DataSourceRepository dataSourceRepository;

    @Autowired
    public IdApiController(NativeWebRequest request,
            com.reportforge.datasource.repository.DataSourceRepository dataSourceRepository) {
        this.request = request;
        this.dataSourceRepository = dataSourceRepository;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<List<Object>> idQueryPost(@PathVariable("id") Integer id,
            @Valid @RequestBody IdQueryPostRequest idQueryPostRequest) {
        if (!dataSourceRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        // In a production service, this would use JDBC to connect to the remote DB
        // and execute the query from idQueryPostRequest.getSql()
        List<Object> placeholderResults = new java.util.ArrayList<>();
        java.util.Map<String, Object> row = new java.util.LinkedHashMap<>();
        row.put("message", "Query executed against data source " + id);
        row.put("sql", idQueryPostRequest.getSql());
        placeholderResults.add(row);
        return ResponseEntity.ok(placeholderResults);
    }
}
