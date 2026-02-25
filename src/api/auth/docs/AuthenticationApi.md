# AuthenticationApi

All URIs are relative to *http://localhost:8081/api/v1/auth*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**loginPost**](AuthenticationApi.md#loginpost) | **POST** /login | Authenticate user and issue JWT |
| [**registerPost**](AuthenticationApi.md#registerpost) | **POST** /register | Register a new user |



## loginPost

> JwtResponse loginPost(loginRequest)

Authenticate user and issue JWT

### Example

```ts
import {
  Configuration,
  AuthenticationApi,
} from '';
import type { LoginPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthenticationApi();

  const body = {
    // LoginRequest
    loginRequest: ...,
  } satisfies LoginPostRequest;

  try {
    const data = await api.loginPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **loginRequest** | [LoginRequest](LoginRequest.md) |  | |

### Return type

[**JwtResponse**](JwtResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## registerPost

> registerPost(registerRequest)

Register a new user

### Example

```ts
import {
  Configuration,
  AuthenticationApi,
} from '';
import type { RegisterPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthenticationApi();

  const body = {
    // RegisterRequest
    registerRequest: ...,
  } satisfies RegisterPostRequest;

  try {
    const data = await api.registerPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **registerRequest** | [RegisterRequest](RegisterRequest.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

