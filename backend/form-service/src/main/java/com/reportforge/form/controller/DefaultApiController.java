package com.reportforge.form.controller;

import com.reportforge.form.model.FormDefinition;
import com.reportforge.form.model.FormRequest;

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
@RequestMapping("${openapi.formService.base-path:/api/v1/forms}")
public class DefaultApiController implements DefaultApi {

    private final NativeWebRequest request;
    private final com.reportforge.form.repository.FormRepository formRepository;

    @Autowired
    public DefaultApiController(NativeWebRequest request,
            com.reportforge.form.repository.FormRepository formRepository) {
        this.request = request;
        this.formRepository = formRepository;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<List<FormDefinition>> rootGet() {
        List<FormDefinition> forms = new java.util.ArrayList<>();
        for (com.reportforge.form.entity.FormEntity entity : formRepository.findAll()) {
            FormDefinition dto = new FormDefinition();
            dto.setId(entity.getId());
            dto.setTitle(entity.getTitle());
            dto.setDescription(entity.getDescription());
            dto.setFields(entity.getFields());
            forms.add(dto);
        }
        return ResponseEntity.ok(forms);
    }

    @Override
    public ResponseEntity<Void> rootPost(@Valid @RequestBody FormRequest formRequest) {
        com.reportforge.form.entity.FormEntity entity = new com.reportforge.form.entity.FormEntity();
        entity.setTitle(formRequest.getTitle());
        entity.setDescription(formRequest.getDescription());
        entity.setFields(formRequest.getFields());
        formRepository.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
