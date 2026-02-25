package com.reportforge.auth.controller;

import com.reportforge.auth.model.JwtResponse;
import com.reportforge.auth.model.LoginRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.security.authentication.AuthenticationManager;
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
@RequestMapping("${openapi.authUserService.base-path:/api/v1/auth}")
public class LoginApiController implements LoginApi {

    private final NativeWebRequest request;
    private final AuthenticationManager authenticationManager;
    private final com.reportforge.auth.security.JwtUtils jwtUtils;

    @Autowired
    public LoginApiController(NativeWebRequest request, AuthenticationManager authenticationManager,
            com.reportforge.auth.security.JwtUtils jwtUtils) {
        this.request = request;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<JwtResponse> loginPost(@Valid @RequestBody LoginRequest loginRequest) {
        org.springframework.security.core.Authentication authentication = authenticationManager.authenticate(
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(), loginRequest.getPassword()));

        org.springframework.security.core.context.SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        com.reportforge.auth.security.UserDetailsImpl userDetails = (com.reportforge.auth.security.UserDetailsImpl) authentication
                .getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(java.util.stream.Collectors.toList());

        JwtResponse response = new JwtResponse()
                .token(jwt)
                .type("Bearer")
                .id(userDetails.getId())
                .username(userDetails.getUsername())
                .roles(roles);

        return ResponseEntity.ok(response);
    }
}
